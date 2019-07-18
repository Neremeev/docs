import * as MobileDetect from 'mobile-detect/mobile-detect.js'
import InputNum from '../../cart/input-num/input-num.vue'

export default {
    name: 'item',
    data() {
        return {
            device: false,
            loader: false,
            isFavorite: 'favorite',
            useButtons: true
        }
    },
    props: {
        size: {
            type: String,
            required: true,
            default: 'm'
        },
        product: {
            type: Object,
            required: true
        },
        authorized: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        const md = new MobileDetect(window.navigator.userAgent)
        this.device = md.phone() ? 'phone' : md.tablet() ? 'tablet' : 'desktop'
        this.setFavoriteClass()
    },
    methods: {
        changeCount(method, quantity) {
            if (this.useButtons) {
                this.useButtons = false
                let data = this.product.id
                if (method === 'changeCount') {
                    data = { id: this.product.id, quantity }
                }
                this.$store.dispatch(`cart/${method}`, data).then(() => {
                    this.$store.commit('favorite/updateItemInCart', { id: this.product.id, quantity })
                    this.useButtons = true
                })
            }
        },
        changeFavorite(id, favorite) {
            if (this.useButtons) {
                this.useButtons = false
                this.setFavoriteClass('setPulse')
                this.$store.dispatch('favorite/updateFavorite', { id, favorite }).then(() => {
                    this.setFavoriteClass()
                    this.useButtons = true
                })
            }
        },
        setFavoriteClass(value) {
            this.isFavorite = this.product.favorite ? 'favorite-active' : 'favorite'
            if (this.device !== 'desktop') this.isFavorite += ' favorite-for-mobile'
            if (value) this.isFavorite += ' pulse'
        }
    },
    components: {
        InputNum
    }
}
