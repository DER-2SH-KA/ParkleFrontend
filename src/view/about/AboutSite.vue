<script setup lang="ts">
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
</script>

<template>
  <HeaderComponent class="header-component" />
  <main>
    <section class="about-section" id="section-about-website">
      <h2>О проекте</h2>
      <p>
        Этот сайт является аналогом системы закладок в браузерах. Храните вкладки здесь, а не
        засоряйте панель вкладок вышего браузера.
      </p>
    </section>
  </main>

  <FooterComponent class="footer__footer-component" />
</template>

<style lang="scss">
body {
  background-color: var(--background-color-dark-theme);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-component {
  position: sticky;
  top: 0;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 1 0 auto;
}

.about-section {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  color: white;
  margin: 50px;

  & > h2 {
    text-indent: 1.25cm;
    font-size: 22pt;
    font-weight: bold;
  }

  & > p {
    text-indent: 1.25cm;
    font-size: 16pt;
    font-weight: normal;
  }
}

@media (max-width: 768px) {
  .about-section {
    & > h2 {
      font-size: 18pt;
    }

    & > p {
      font-size: 14pt;
    }
  }
}
</style>
