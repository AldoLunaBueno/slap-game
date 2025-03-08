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
  <div class="container-lg my-4">
    <section class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center">
      <!-- Sample Cards (Dynamically generated) -->
      <article class="col" v-for="deck in decks" :key="deck.id">
        <div class="card">
          <img :src="deck.image_url" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Florida_Box_Turtle_Digon3.jpg/330px-Florida_Box_Turtle_Digon3.jpg" class="card-img-top" alt="Image" />
          <div class="card-body">
            <span>{{ deck.name }}</span>
            <footer class="card-footer">{{ deck.description }}</footer>
          </div>
        </div>
      </article>
      <!-- More cards here -->
    </section>
  </div>
  <!-- <div class="card">
        <article v-for="deck in decks" :key="deck.id" class="card-item">
        <aside >
          <img :src="deck.image_url" alt="" />
        </aside>
        <div>
          <span>{{ deck.name }}</span>
          <footer>{{ deck.description }}</footer>
        </div>
      </article>
      </div> -->
</template>

<style>
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
</style>
