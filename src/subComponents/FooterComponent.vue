<script setup lang="ts"></script>

<template>
  <footer>
    <p>
      &copy;Создан
      <a
        href="https://github.com/DER-2SH-KA"
        target="_blank"
        placeholder="Github"
        alt="GitHub Link"
      >
        DER-2SH-KA
      </a>
      по MIT лицензии
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: var(--background-second-color-dark-theme);
  min-width: 100%;

  & > p {
    color: var(--text-color-dark-theme);
    text-align: center;
    font-size: 12pt;
    margin: 10px 0px 10px 0px;

    & > a {
      color: var(--text-color-dark-theme);
      text-decoration: underline;
    }
  }
}
</style>
