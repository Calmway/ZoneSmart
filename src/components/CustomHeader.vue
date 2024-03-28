<template lang="pug">
    .header-component
        .user
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M6.73529 10.9574C6.73529 8.73416 7.28024 7.13388 8.23214 6.09242C9.17731 5.05833 10.5929 4.5 12.5 4.5C14.4071 4.5 15.8227 5.05833 16.7679 6.09242C17.7198 7.13388 18.2647 8.73416 18.2647 10.9574C18.2647 13.1913 19.6077 15.5354 20.9996 17.3829C21.4289 17.9527 21.4675 18.7365 21.1846 19.3977C20.903 20.0556 20.3473 20.5 19.67 20.5H5.32995C4.65269 20.5 4.09698 20.0556 3.81544 19.3977C3.53248 18.7365 3.57113 17.9527 4.00043 17.3829C5.3923 15.5354 6.73529 13.1913 6.73529 10.9574Z" stroke="#999999"/>
                <path d="M15 20.5C15 21.8807 13.8807 23 12.5 23C11.1193 23 10 21.8807 10 20.5" stroke="#999999"/>
                <path d="M15 5C15 3.34315 13.8807 2 12.5 2C11.1193 2 10 3.34315 10 5" stroke="#999999"/>
            </svg>
            span example@gmail.com
            span
            <svg style="margin-inline-start: 15px; cursor: pointer" @click="logout" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="16px" width="16px" version="1.1" id="Capa_1" viewBox="0 0 384.971 384.971" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <g> <g id="Sign_Out"> <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"/> <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g>
            </svg>
</template>

<script>
import store from '../store/index'
export default {
    name: 'CustomHeader',
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        logout() {
            store.commit('LOGOUT')
        }
    }

}
</script>

<style scoped lang="scss">
.header-component {
    background: #fff;
    width: 100%;
    height: 80px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    .user {
        display: flex;
        align-items: center;
    }
    svg {
        margin-inline-end: 15px;
    }
}
</style>
