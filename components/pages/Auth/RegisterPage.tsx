import { h } from 'preact'
import { AVInput, AVButton, AVLink } from '~/components/controls'
import { CommonOrnament1, LightBrandLogo } from '~/static/img'
import './_register.scss'


export const RegisterPage = () => (
  <div class='register-page' data-theme="light">

    <AVLink link="/">
      <img class="brand-logo" src={LightBrandLogo} alt="Brand"/>
    </AVLink>

    <div class="panel-main">
      <div class="section main">
        <div class="tx panel-title">Daftar</div>
        <div class="tx panel-subtitle">Pengguna baru? Daftar dan dapatkan keuntungan Adavendor.</div>

        <div class="enclosure-input">
          <AVInput id="reg-email" type="email" label="Email address" />
        </div>
        <div class="enclosure-input">
          <AVInput id="reg-name" type="text" label="Givenname" />
        </div>
        <div class="enclosure-input">
          <AVInput id="reg-password" type="password" label="Password" />
        </div>

        <div class="enclosure-action">
          <AVButton size="large" onClick={() => window.location.href = '/'}>
            REGISTER
        </AVButton>
        </div>

        <div class="enclosure-action">
          <div class="tx par">
            Sudah punya akun? <AVLink link="/auth/login" color="primary">Masuk</AVLink>
          </div>
        </div>

      </div>
      <div class="section ornament">
        <img src={CommonOrnament1} alt="Ornament"/>
      </div>
    </div>
  </div>
)