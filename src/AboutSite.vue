<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue'
</script>

<template>
  <HeaderComponent class="header-component" />
  <main>
    <section class="about-section" id="section-about-website">
      <h2>About Website</h2>
      <p>
        This site is an analog of the bookmarks system in browsers. In the modern world of
        information technology, there are millions of Internet resources on the Internet that we
        would like to always have quick access to. However, the various ways of storing these links
        in fast access in modern browsers have their drawbacks.
      </p>
      <p>
        Bookmarks take up quite a lot of space in the upper or side panel of the browser without the
        ability to quickly find the desired site, which spoils the user experience.
      </p>
      <p>
        Then browsers came up with "groups" and "folders" of sites that simply hid a group of
        bookmarks under a single folder icon. This solves the problem of the fullness of the upper
        browser panel, but it makes it much more difficult to find the desired saved site f the
        purpose of the site is ambiguous or the user has built a bad hierarchy and the name of
        folders and sites in them.
      </p>
      <p>
        An important problem is the lack of synchronization of saved tabs between different
        browsers. For some, this is an advantage, because in this way it is possible to logically
        delineate the area of use of a particular browser without distracting from a specific task.
        However, there are many resources that are equally often needed, regardless of the range of
        tasks for which the user uses different browsers. In addition, this task is solved by the
        very folders that hide a lot of unnecessary sites at the moment.
      </p>
      <p>
        Finally, there are cases when due to errors in the user's system or due to errors by the
        user himself, all information about the assigned sites and groups of sites is lost. Modern
        browsers have their own mechanisms to restore user data, for example, the "history" and the
        recommendation of account registration in the system. However, these operations require
        additional actions and are often linked to a specific browser, and sometimes to the user's
        technique.
      </p>
      <p>
        The site you are currently on is designed to solve the above problems that the site
        developer himself faced in real life. You can save a huge number of links to Internet
        resources on it and have quick access to them regardless of the browser without the chance
        of losing data due to an emergency power outage in your building.
      </p>
      <p>
        <span style="font-weight: bold; text-decoration: underline"
          >Please note that this site is a home project of a developer with the nickname DER-2SH-KA
          on GitHub under an MIT license. This means that the developer is not responsible for any
          damage caused by the use of the product and data loss. However, the developer will try to
          avoid any unpleasant impressions about the service related to the technical component of
          the project.</span
        >
      </p>
    </section>
  </main>
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

  background-color: aqua;
}

.about-section {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  color: white;
  background-color: red;
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
