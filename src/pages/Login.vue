<template lang="pug">
    div.login-component
        div.login-wrapper
            h1 Вход
            p Нет аккаунта?
                span.green-color-text(style="margin-inline-start: 5px;") Зарегистрироваться
            div.login-form-wrapper
                div.form-email
                    article Email
                    input(id="loginEmail" type="email" placeholder="yourmail@mail.ru" v-model="email")
                div.form-password
                    article Пароль
                    input(id="loginPassword" type="password" placeholder="Ваш пароль" v-model="password")
            p.green-color-text Забыли пароль?
            button(:class="email || password ? 'active' : ''" :disabled="!email || !password" @click="makeLogin") Войти
</template>

<script>
import swal from 'sweetalert2'
import store from '../store/index'
export default {
    name: 'login',
    data() {
        return {
            email: 'candid8@zonesmart.ru',
            password: '4815162342',
        }
    },
    computed: {
    },
    methods: {
        async makeLogin() {
            if (!this.email) {
                swal.fire({
                    icon: 'error',
                    text: 'Пожалуйста заполните поле для email'
                })
                return
            }
            if (!this.password) {
                swal.fire({
                    icon: 'error',
                    text: 'Пожалуйста заполните поле для password'
                })
                return
            }
            const userData = { email: this.email, password: this.password }
            store.dispatch('login', userData)
        }
    }

}
</script>

<style scoped lang="scss">
.login-component {
    .login-wrapper {
        background: #fff;
        height: 420px;
        width: 350px;
        border-radius: 20px;
        margin: 0 auto;
        margin-top: 10%;
        padding: 40px;
        box-sizing: border-box;

        article {
            margin-bottom: 8px;
            color: #999999;
        }

        input {
            max-height: 50px;
            padding: 12px 20px;
            width: 100%;
            box-sizing: border-box;
        }

        .form-email {
            margin-bottom: 20px;
        }

        button {
            font-weight: bold;
            padding: 17px 30px;
        }

        button.active {
            cursor: pointer;
        }

        .green-color-text {
            color: #2ED2BA;
        }
    }

}

@media only screen and (max-width: 425px) {

    .login-component .login-wrapper {
        width: 70%;
    }
}
</style>
