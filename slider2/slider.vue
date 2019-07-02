<template>
    <div class="slider">
        <div class="slider__wrapper">
            <div
                @touchstart="touch($event)"
                @touchend="touch($event)"
                class="slider__slide"
                @wheel.prevent.stop="move($event)"
            >
                <div
                    :style="{'left': item.left + 'px'}"
                    v-for="item in items"
                    :key="item.id"
                    class="image-slide"
                >
                    <div><img class="image"><img :src="item.image" :alt="item.name"></img></div>
                    <div class="item-counter">{{ item.id }}</div>
                </div>
            </div>
        </div>
        <button
            :class="{'events-none': eventNone}"
            class="slider__btn slider__btn--left"
            @click.stop="move($event, 'left')"
        >Left</button>
        <button
            :class="{'events-none': eventNone}"
            class="slider__btn slider__btn--right"
            @click.stop="move($event, 'right')"
        >Right</button>
    </div>
</template>

<script src="./slider.js"></script>
<style scoped lang="scss" src="./slider.scss"></style>
