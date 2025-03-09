<script type="module">
import CardsService from "@/services/CardsService";
import _ from "lodash";

export default {
  name: "play",
  data() {
    return {
      cards: [],
      numOptions: 4,
      rand: 0,
    };
  },
  props: {
    deckId: String,
  },
  async mounted() {
    await this.getCards();
  },
  methods: {
    async getCards() {
      this.cards = await CardsService.getCards(this.deckId);
    },
    getSomeCards() {
      this.rand = _.sample()
    },
    printConsole() {
      console.log(this.cards)
    }
  },
};
</script>

<template>
  <section class="play">
    <div class="player computer">
      <span class="name">PC</span>
      <div class="handplace">
        <div class="ring computer"></div>
        <img class="hand computer" src="@/assets/play/hand-red.png" />
      </div>

      <span class="score">0</span>
    </div>

    <div class="options">
      <article>{{ rand }}</article>
      <article></article>
      <article></article>
      <article></article>
      <div class="infobox"></div>
    </div>

    <div class="player human">
      <span class="name">You</span>
      <div class="handplace">
        <div class="ring human"></div>
        <img id="draggable" class="hand human" src="@/assets/play/hand-blue.png" />
      </div>

      <span class="score">0</span>
    </div>
  </section>

  <!-- <p v-for="card in cards">
    <img :src="card.image_url" alt="">
  </p> -->
</template>

<style scoped>
section.play {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6vh;

  background-image: url('@/assets/play/blackboard.webp');
  background-size: cover; /* Cover entire container */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Avoid repetition */

  .options {
    display: grid;
    gap: 5vh;
    grid-template-columns: 1fr 1fr;

    article {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15vh;
      height: 15vh;

      border-radius: 8px;
      border: 5px solid #06341d;
      overflow: hidden;

      img.item {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    gap: 10px;

    .handplace {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16vh;
      height: 16vh;

      .ring {
        width: 100%;
        height: 100%;
        border-radius: 50%;

        &.computer {
          border: 1vh solid red;
        }
        &.human {
          border: 1vh solid blue;
        }
      }
    }

    .name {
      font-weight: bold;
    }

    .score {
      font-weight: bold;
    }
  }

  .hand {
    position: absolute;
    width: 10vh;
    height: auto;
    touch-action: none;

    &.computer {
      pointer-events: none;
    }
  }
}

@media (max-aspect-ratio: 1/1) {
  main section.play {
    flex-direction: column;

    .player {
      flex-direction: row;
    }
  }
}

.pulse {
  animation: pulse-animation 2s;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
}

.anchor {
  anchor-name: --my-anchor;
}

.infobox {
  position: absolute;
  color: black;
  position-anchor: --my-anchor;
  position-area: end span-all;
  display: none;
}
</style>
