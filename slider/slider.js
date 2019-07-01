export default {
    name: 'Slider',
    data() {
        return {
            items: [
                {
                    image: 'https://ktonanovenkogo.ru/image/finik.jpg',
                    name: 'food1',
                    count: 0,
                    id: 1
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/fribitkoin.jpg',
                    name: 'food2',
                    count: 0,
                    id: 2
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/mchange-net-obmennik.jpg',
                    name: 'food3',
                    count: 0,
                    id: 3
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/kak-zarabotat-v-internete.jpg',
                    name: 'food4',
                    count: 0,
                    id: 4
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/smmmoney-sotcseti.jpg',
                    name: 'food5',
                    count: 0,
                    id: 5
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/partnerskie-programmy.jpg',
                    name: 'food6',
                    count: 0,
                    id: 6
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/birzhi-kriptovaliuti.jpg',
                    name: 'food7',
                    count: 0,
                    id: 7
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/vokzilla.jpg',
                    name: 'food8',
                    count: 0,
                    id: 8
                }
            ],
            viewItems: [],
            anim: true,
            eventNone: false,
            touchStart: 0
        }
    },
    created: function() {
        this.viewItems = this.items.splice(0, 5)
        let step = 0
        for (let i = 0; i < this.viewItems.length; i++) {
            this.viewItems[i].left = 234 * step - 234
            step++
        }
    },
    methods: {
        touch: function(event) {
            if (event.type === 'touchstart') {
                this.touchStart = event.changedTouches[0].clientX
            } else if (event.changedTouches[0].clientX > this.touchStart) {
                this.move(event, 'left')
            } else {
                this.move(event, 'right')
            }
        },
        move: function(event, side) {
            let s = ''
            if (event.type === 'wheel' && event.deltaY < 0) {
                s = 'left'
            } else if (event.type === 'wheel' && event.deltaY > 0) {
                s = 'right'
            } else {
                s = side
            }
            if (this.eventNone) return null
            this.eventNone = true
            if (s === 'right') {
                this.viewItems = this.viewItems.concat(this.items.splice(0, 1))
                this.viewItems[this.viewItems.length - 1].left = this.viewItems[this.viewItems.length - 2].left + 234
                for (let i = 0; i < this.viewItems.length; i++) {
                    this.viewItems[i].left -= 234
                }
            } else {
                this.viewItems.unshift(this.items.splice(this.items.length - 1, 1)[0])
                this.viewItems[0].left = this.viewItems[1].left - 234
                for (let i = 0; i < this.viewItems.length; i++) {
                    this.viewItems[i].left += 234
                }
            }
            setTimeout(() => {
                this.anim = false
                if (s === 'right') {
                    this.items = this.items.concat(this.viewItems.splice(0, 1))
                } else {
                    this.items = this.items.concat(this.viewItems.splice(this.viewItems.length - 1, 1))
                }
                setTimeout(() => {
                    this.anim = true
                    this.eventNone = false
                }, 0)
            }, 400)
        }
    }
}
