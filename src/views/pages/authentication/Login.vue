<template>
  <div class="auth-wrapper auth-v2" id="snail-login">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          GallopingSnail
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >

<!--        <div class="wrap" >-->
<!--          <div class="cardl">-->
<!--            <div class="rolebg">-->
<!--              <img :src="rolebg" alt="">-->
<!--            </div>-->
<!--            <div class="role">-->
<!--              <img :src="role" alt="">-->
<!--            </div>-->
<!--            <div class="content">-->
<!--              <h1>GallopingSnail</h1>-->
<!--              <p>一站式自动化平台 </p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <blockquote class="blockquote pl-1 border-left-primary border-left-3">
          <h2 class="mb-0">
            一站式自动化平台
          </h2>
          <footer class="blockquote-footer" >
            <h5>定时执行解决重复工作,兼容网页自动化，手机群控脚本操作，支持接口批量调用</h5>
          </footer>
        </blockquote>
        <a href="#" target="_blank">
          <img src="../../../assets/images/logo/logo.png" />
        </a>
        <!--3D动态态首图-->
<!--        <iframe src='https://my.spline.design/untitled-b7290f9ce8ff48256ae71bf1bcff7654/' frameborder='0' width='100%' height='100%'></iframe>-->
<!--静态首图-->
<!--        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">-->
<!--          <b-img-->
<!--            fluid-->
<!--            :src="imgUrl"-->
<!--            alt="Login V2"-->
<!--          />-->
<!--        </div>-->
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            Welcome to GalopingSnail! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <b-alert
            variant="primary"
            show
          >
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50"><span class="font-weight-bold">Admin:</span> admin@demo.com | admin</small>
              </p>
              <p>
                <small class="mr-50"><span class="font-weight-bold">Client:</span> client@demo.com | client</small>
              </p>
            </div>
            <feather-icon
              v-b-tooltip.hover.left="'This is just for ACL demo purpose'"
              icon="HelpCircleIcon"
              size="18"
              class="position-absolute"
              style="top: 10px; right: 10px;"
            />
          </b-alert>

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- email -->
              <b-form-group
                label="Email"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                Sign in
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">
              or
            </div>
          </div>

          <!-- social buttons -->
          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              href="javascript:void(0)"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              variant="twitter"
              href="javascript:void(0)"
            >
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button
              variant="google"
              href="javascript:void(0)"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              variant="github"
              href="javascript:void(0)"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BAlert, VBTooltip,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import {getHomeRouteForLoggedInUser, initMenu} from '@/auth/utils'
import bg from '@/assets/images/login/bg.png'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '123456',
      userEmail: '201507802@qq.com',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      rolebg: require('@/assets/images/login/rolebg.png'),
      role: require('@/assets/images/login/role.png'),

      styles:{
        background: `url(${bg}) no-repeat`
      },
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        this.rolebg= require('@/assets/images/login/rolebg.png'),
        this.role= require('@/assets/images/login/role.png')

        return this.sideImg,this.rolebg,this.role
      }
      return this.sideImg
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const params = new URLSearchParams();
          params.append('loginEmail', this.userEmail);
          params.append('loginPassword', this.password);
          useJwt.login(params)
            .then(response => {
              const userData = response.data.data
              const ability = [{action: 'manage', subject: 'all',},]
              useJwt.setToken(response.data.accessToken)
              localStorage.setItem('userData', JSON.stringify(userData))
              localStorage.setItem('ability',ability)
              this.$ability.update(ability)
              const userRole =  userData.userInfo.authorities[0].authority
              // ? This is just for demo purpose as well.
              // ? Because we are showing eCommerce app's cart items count in navbar
              this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', 5)
              // ? Because we are showing eCommerce app's cart items count in navbar
              // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              this.$router.replace(getHomeRouteForLoggedInUser(userRole)).catch(() =>{})
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: `Welcome ${userData.userInfo.username}`,
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: `You have successfully logged in as ${userData.userInfo.authorities[0].authority}. Now you can start to explore!`,
                    },
                  })
                })
            })
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response.data.error)
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '/src/@core/scss/vue/pages/page-auth.scss';

</style>
