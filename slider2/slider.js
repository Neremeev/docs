export default {
    name: 'Slider',
    data() {
        return {
            items: [
                {
                    image: 'https://ktonanovenkogo.ru/image/finik.jpg',
                    name: 'food1',
                    id: 1
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/fribitkoin.jpg',
                    name: 'food2',
                    id: 2
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/mchange-net-obmennik.jpg',
                    name: 'food3',
                    id: 3
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/kak-zarabotat-v-internete.jpg',
                    name: 'food4',
                    id: 4
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/smmmoney-sotcseti.jpg',
                    name: 'food5',
                    id: 5
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/partnerskie-programmy.jpg',
                    name: 'food6',
                    id: 6
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/birzhi-kriptovaliuti.jpg',
                    name: 'food7',
                    id: 7
                },
                {
                    image: 'https://ktonanovenkogo.ru/image/vokzilla.jpg',
                    name: 'food8',
                    id: 8
                }
            ],
            eventNone: false,
            touchStart: 0,
            itemSize: 234,
            currentIndex: 0
        }
    },
    created: function() {
        // ждать дизы при адаптиве, сделать если меньше пяти - карусель, + убрать нексттики, если делать пять штук
        let step = 1
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].left = this.itemSize * step - this.itemSize
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
        move: function(event, direction) {
            let goTo = ''
            if (event.type === 'wheel' && event.deltaY < 0) {
                goTo = 'left'
            } else if (event.type === 'wheel' && event.deltaY > 0) {
                goTo = 'right'
            } else {
                goTo = direction
            }
            if (this.eventNone) return null
            this.eventNone = true
            if (goTo === 'right') {
                if (this.currentIndex + 3 >= this.items.length) {
                    this.items.push(this.items.splice(0, 1)[0])
                    this.items[this.items.length - 1].left = this.items[this.items.length - 2].left + this.itemSize
                }
                this.$nextTick(() => {
                    for (let i = 0; i < this.items.length; i++) {
                        this.items[i].left -= this.itemSize
                        if (this.items[i].left === 0) {
                            this.currentIndex = i
                        }
                    }
                })
            } else {
                if (this.currentIndex === 0) {
                    this.items.unshift(this.items.splice(this.items.length - 1, 1)[0])
                    this.items[0].left = this.items[1].left - this.itemSize
                }
                this.$nextTick(() => {
                    for (let i = 0; i < this.items.length; i++) {
                        this.items[i].left += this.itemSize
                        if (this.items[i].left === 0) {
                            this.currentIndex = i
                        }
                    }
                })
            }
            setTimeout(() => {
                this.eventNone = false
            }, 200)
        }
    }
}
