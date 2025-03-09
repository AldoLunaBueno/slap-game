<script type="module">
import DecksService from "@/services/DecksService";
export default {
  name: "decks",
  data() {
    return {
      decks: [],
    };
  },
  mounted() {
    this.getDecks();
  },
  methods: {
    async getDecks() {
      this.decks = await DecksService.getDecks();
    },
  },
};
</script>

<template>
  <div class="container-lg py-4 justify-content-center">
    <section class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
      <!-- cards dynamically generated -->
      <article class="col" v-for="deck in decks" :key="deck.id">
        <a :href="'/play/' + deck.id">
          <div class="card">
            <img :src="deck.image_url" class="card-img-top" alt="Image"/>
            <div class="card-body">
              <span class="card-title">{{ deck.name }}</span>
              <footer class="card-footer text-muted">{{ deck.description }}</footer>
            </div>
          </div>
        </a>
      </article>
    </section>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.card {
  height: 200px;
  border-radius: 8px;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  overflow: hidden;
}
.card-img-top {
  height: 90px;
  object-fit: cover;
}
.card-body {
  padding: 0.5rem;
  text-align: center;
}
.card-body span {
  display: block;
  height: 27px;
  font-size: small;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.card-footer {
  font-size: 0.7rem;
  background: none;
  border: none;
}

img {
  -webkit-user-drag: none;
}
</style>
