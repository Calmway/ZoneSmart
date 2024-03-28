<template lang="pug">
    .my-products-component
        h2 Мои Товары {{ countFromTotal }}
        p Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
        P Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
        .add-products-wrapper
            input.add-product-input(v-model="addProduucts" placeholder="Введите артикул продавца, артикул WB или ссылку на товар")
            button Добавить
            p Например ваши товары: 119203059, 124366343, 59801844
        .list-products-wrapper
            div.products-list-table
                div.products-list-table-header
                    div.products-list-table-header-row
                        div.product-checkbox
                            input(type="checkbox", name="selecAll" id="selectAll" @click="selectAll")
                        div.product-image Фото
                        div.product-vendor-code(@click="sortBothWay('remote_id')")
                            span Артикул продавца
                            SortArrow
                        div.product-brand(@click="sortBothWay('brand_name')")
                            span Бренд
                            SortArrow
                        div.product-name(@click="sortBothWay('title')")
                            span Название
                            SortArrow
                        div.product-left-count(@click="sortBothWay('quantity')")
                            span Остаток, шт.
                            SortArrow
                        div.product-current-price(@click="sortBothWay('price')")
                            span Текущая цена
                            SortArrow
                        div.product-min-price(@click="sortBothWay('min_price')")
                            span Минимальная цена
                            SortArrow
                        div.product-max-price(@click="sortBothWay('max_price')")
                            span Максимальная цена
                            SortArrow
                        div.product-remove Удалить
                    div.products-list-table-header-row.action-row(v-if="selectedCount > 0")
                        div(style="width: 53%")
                            span Выбрано {{ selectedCount }} из {{ list.length }}
                            button.remove-selected-button(@click="removeSelected")
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <g clip-path="url(#clip0_1_4443)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0.500122C6 0.776264 6.22386 1.00012 6.5 1.00012H3H1V3.00012V4.00012V6.00012H2V11.0001C2 13.2093 3.79086 15.0001 6 15.0001H9C11.2091 15.0001 13 13.2093 13 11.0001V6.00012H14V4.00012V3.00012V1.00012H12H8.5C8.77614 1.00012 9 0.776264 9 0.500122C9 0.22398 8.77614 0.00012207 8.5 0.00012207H6.5C6.22386 0.00012207 6 0.22398 6 0.500122ZM3 4.00012V3.00012H12V4.00012H11H4H3ZM4 6.00012H11V11.0001C11 12.1047 10.1046 13.0001 9 13.0001H6C4.89543 13.0001 4 12.1047 4 11.0001V6.00012Z" fill="#132639"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1_4443">
                                            <rect width="15" height="14.9998" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                span Удалить выделенные
                        div(style="width: 47%")
                            div(style="width: 42%")
                                p Для всех выделенных
                            div(style="width: 24%")
                                input(type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" placeholder="Р" v-model="totalMinPrice" @input="onChangeMinPrice")
                            div(style="width: 24%")
                                input(type="text" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" placeholder="Р" v-model="totalMaxPrice" @input="onChangeMaxPrice" )
                div.products-list-table-body(v-if="list && list.length > 0")
                    div.products-list-table-body-row(v-for="(product, index) in list" :key="product.id")
                        div.product-checkbox
                            input(type="checkbox", name="selecAll" id="selectAll" v-model="product.selected")
                        div.product-image
                            img(:src="product.images[0]")
                        div.product-vendor-code
                            a(:href="product.url" target="_blank" style="margin-inline-end: 8px")
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.34311 18.1564C6.3668 17.1801 6.3668 15.5972 7.34311 14.6209L10.1715 11.7925C11.1479 10.8162 12.7308 10.8162 13.7071 11.7925C13.9968 12.0822 14.2005 12.4254 14.3183 12.7902L15.2731 12.4921C15.1087 11.9776 14.8224 11.4936 14.4142 11.0854C13.0473 9.71854 10.8313 9.71854 9.46443 11.0854L6.63601 13.9138C5.26917 15.2806 5.26917 17.4967 6.63601 18.8635C8.00284 20.2304 10.2189 20.2304 11.5858 18.8635L14.061 16.3883L12.6468 16.3883L10.8786 18.1564C9.90234 19.1328 8.31942 19.1328 7.34311 18.1564Z" fill="#999999"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6569 6.84356C19.6332 7.81987 19.6332 9.40278 18.6569 10.3791L15.8285 13.2075C14.8522 14.1838 13.2692 14.1838 12.2929 13.2075C12.0032 12.9178 11.7995 12.5746 11.6817 12.2098L10.7269 12.5079C10.8913 13.0224 11.1776 13.5064 11.5858 13.9146C12.9527 15.2815 15.1687 15.2815 16.5356 13.9146L19.364 11.0862C20.7308 9.71937 20.7308 7.50329 19.364 6.13645C17.9972 4.76962 15.7811 4.76962 14.4142 6.13645L11.939 8.61167L13.3532 8.61167L15.1214 6.84356C16.0977 5.86725 17.6806 5.86725 18.6569 6.84356Z" fill="#999999"/>
                                </svg> 
                            span {{ product.remote_id }}
                        div.product-brand {{ product.brand_name }}
                        div.product-name {{ product.title }}
                        div.product-left-count {{ product.quantity }}
                        div.product-current-price(style="text-align: center") {{ product.price }} &#8381; 
                        div.product-min-price.product-price
                            input(type="text" v-model="product.min_price" disabled)
                        div.product-max-price.product-price
                            input(type="text" v-model="product.max_price" disabled)
                        div.product-remove
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M6.5 6.5H18.5V21C18.5 21.8284 17.8284 22.5 17 22.5H8C7.17157 22.5 6.5 21.8284 6.5 21V6.5Z" stroke="#999999"/>
                                    <rect x="0.5" y="-0.5" width="14" height="3" rx="1.5" transform="matrix(1 0 0 -1 5 6)" stroke="#999999"/>
                                <path d="M10 3.5V3.5C10 2.11929 11.1193 1 12.5 1V1C13.8807 1 15 2.11929 15 3.5V3.5" stroke="#999999"/>
                                <rect x="10" y="9" width="1" height="11" fill="#999999"/>
                                <rect x="14" y="9" width="1" height="11" fill="#999999"/>
                            </svg>
            .paginator(v-if="totalPages")
                span(@click="changePage(-1)")
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
                        <path d="M7 1L2 6.5L7 12" stroke="#132639" stroke-width="2"/>
                    </svg>
                span.paginator-page(v-for="page in totalPages" @click="getMore(page)" :class="{active: currentPage === page}") {{ page }}

                span(@click="changePage(1)")
                    <svg style="transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
                        <path d="M7 1L2 6.5L7 12" stroke="#132639" stroke-width="2"/>
                    </svg>

</template>

<script>
import store from '../store/index'
import SortArrow from './SortArrow.vue'
export default {
    name: 'List',
    components: { SortArrow },
    data() {
        return {
            addProduucts: "",
            totalMinPrice: "",
            totalMaxPrice: "",
        }
    },
    computed: {
        list() {
            return store.state.list
        },
        selectedCount() {
            return this.list ? this.list.filter(x => x.selected).length : 0
        },
        totalPages() {
            return store.state.totalPages
        },
        currentPage() {
            return store.state.currentPage
        },
        totalCounts() {
            return store.state.totalCounts ?? 0
        },
        countFromTotal() {
            if (this.currentPage === 1) {
                return `${this.list.length} из ${this.totalCounts}`
            } else {
                return `${10 * (this.currentPage - 1) + this.list.length} из ${this.totalCounts}`
            }
        }
    },
    watch: {
        selectedCount(newVal) {
            this.totalMaxPrice = ""
            this.totalMinPrice = ""
        }
    },
    methods: {
        selectAll() {
            store.commit('TOGGLE_SELECT_ALL')
        },
        removeSelected() {
            //Мы могли бы конечно вызвать API, передать id выделенных, чтобы удалить
            console.log('Удалены элементы:', this.list.filter(x => x.selected).map(x => x.id))
        },
        onChangeMinPrice() {
            store.commit('CHANGE_MIN_PRICE', this.totalMinPrice)
        },
        onChangeMaxPrice() {
            store.commit('CHANGE_MAX_PRICE', this.totalMaxPrice)
        },
        async changePage(pageNumber) {
            if (this.currentPage === 1 && pageNumber <= 0) {
                return
            } else if (this.currentPage === this.totalPages && pageNumber > 0) {
                return
            }
            store.commit('CHANGE_PAGE', pageNumber)
            await store.dispatch('getList')
        },
        async getMore(page) {
            store.commit('SET_PAGE', page)
            await store.dispatch('getList')
        },
        sortBothWay(sortedParam) {
            store.commit('SORT_LIST', sortedParam)
        }
    }

}
</script>

<style scoped lang="scss">
.my-products-component {
    width: 85%;
    padding: 40px;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 15px;

    .add-products-wrapper {
        input {
            height: 50px;
            padding: 12px 20px;
            width: 50%;
            margin-inline-end: 20px;
        }

        button {
            height: 50px;
            padding: 12px 20px;
        }

        margin-bottom: 45px;
    }

    .products-list-table-body-row {
        height: 60px;
        border-bottom: 1px solid #bebebe;
        display: flex;
        align-items: center;
        overflow: hidden;

        img {
            height: 50px;
            width: 50px;
        }
    }

    .products-list-table-header-row {
        color: #999999;
        margin-bottom: 5px;
    }

    .products-list-table-header-row.action-row {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;

        .remove-selected-button {
            margin-inline-start: 10px;
            padding: 7px 12px;
            cursor: pointer;

            svg {
                margin-inline-end: 10px;
            }
        }
    }

    .products-list-table {
        .action-row {
            background: #e0dfdf;
        }

        .products-list-table-header .products-list-table-header-row div,
        .products-list-table-body .products-list-table-body-row div {
            font-size: 14px;
            display: inline-block;
        }

        .product-checkbox {
            width: 3%;
        }

        .product-image {
            width: 5%;
        }

        .product-vendor-code {
            width: 12%;
        }

        .product-brand {
            width: 8%;
        }

        .product-name {
            width: 25%;
        }

        .product-left-count {
            width: 8%;
        }

        .product-current-price,
        .product-min-price,
        .product-max-price {
            width: 11%;
        }

        .product-remove {
            width: 5%;
            padding-inline-start: 5px
        }

        input {
            padding: 7px 10px;
            width: 85%;
        }
    }

    .paginator {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        span {
            margin: 0 5px;
            cursor: pointer;
        }

        .paginator-page {
            padding: 7px;
            border: 1px solid #bebebe;
            border-radius: 3px;
            margin-inline-end: 3px;

            &.active {
                background: cadetblue;
                border-color: cadetblue;
            }
        }
    }

}
</style>
