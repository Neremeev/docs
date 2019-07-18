<template>
    <div class="item" :class="size">
        <div class="preview" :style="{'backgroundImage': 'url(' + product.image + ')'}">
            <nuxt-link :to="localePath({ name: 'restaurants-id', params: { id: product.store.id } })">
                <div class="restaurant">
                    <div
                        class="logo"
                        :style="{
                            backgroundImage: !!product.store.image ? 'url(' + product.store.image + ')' : null,
                            backgroundSize: !!product.store.image ? 'cover' : '95%'
                        }"
                    />
                    <div class="restaurant-name" :class="{'restaurant-name-tablet': device === 'tablet'}">
                        <div class="name">
                            {{ product.store.title }}
                        </div>
                        <div class="address">
                            {{ product.store.address }}
                        </div>
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link
                v-show="device === 'desktop'"
                class="ref"
                :to="localePath('favorite')"
            />
            <div
                v-show="authorized"
                :class="isFavorite"
                @click="changeFavorite(product.id, product.favorite)"
            />
            <div v-show="device === 'desktop'" class="background-hover" />
        </div>
        <nuxt-link :to="localePath({ name: 'restaurants-id', params: { id: product.store.id } })">
            <div class="restaurant-mobile">
                <div
                    class="logo-mobile"
                    :style="{
                        backgroundImage: !!product.store.image ? 'url(' + product.store.image + ')' : null,
                        backgroundSize: !!product.store.image ? 'cover' : '95%'
                    }"
                />
                <div class="restaurant-name-mobile">
                    {{ product.store.title }}
                </div>
                <div class="arrow-mobile" />
            </div>
        </nuxt-link>
        <div class="item-name">
            {{ product.title }}
        </div>
        <div class="item-count">
            <currency :value="product.price" symbol="rub" />
            <input-num
                :value="product.quantity_in_cart"
                class="input-num"
                @input="quantity => changeCount('changeCount', quantity)"
                @add="changeCount('addProduct', product.quantity_in_cart + 1)"
                @substract="changeCount('substractProduct', product.quantity_in_cart - 1)"
                @remove="changeCount('removeProduct', 0)"
            />
        </div>
    </div>
</template>

<script src="./item.js"></script>
<style scoped lang="scss" src="./item.scss"></style>
