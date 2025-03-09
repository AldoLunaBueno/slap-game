<script type="module">
import CardsService from "@/services/CardsService";

export default {
  name: "play",
  data() {
    return {
      cards: [],
    };
  },
  props: {
    deckId: String,
  },
  mounted() {
    this.getCards();
  },
  methods: {
    async getCards() {
      this.cards = await CardsService.getCards(this.deckId);
    },
  },
};
</script>

<template>
  <p v-for="card in cards">
    <img :src="card.image_url" alt="">
  </p>
</template>
