<template>
  <div class="is-preload">
    <!-- Header -->
    <header-component/>

    <!-- Wrapper -->
    <div id="wrapper" class="wrapper-generic">
      <router-view/>
    </div>

    <!-- Footer -->
    <footer-component class="footer"/>
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import router from "@/router";

export default {
  name: "DonatePage",
  components: {
    HeaderComponent,
    FooterComponent
  },
  setup() {
    document.title = "Verifire";
  },
  mounted() {
    setTimeout(() => {
          router.push({name: "main"});
        }, 5000
    );
  }
}
</script>

<style lang="scss" scoped>
.is-preload {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.wrapper-generic {
  flex: 1 0 auto;
}

.footer {
  flex: 0 0 auto;
}
</style>