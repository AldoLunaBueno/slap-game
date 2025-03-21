<script type="module">
import CardsService from "@/services/CardsService";
import _, { isNull, sample } from "lodash";

export default {
  name: "play",
  data() {
    return {
      cards: [],
      cardSample: null,
      numOptions: 4,
      rand: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      x: null,
      y: null,
      originaParent: null,
      canDrag: true,
    };
  },
  props: {
    deckId: String,
  },
  async mounted() {
    window.addEventListener("touchmove", this.handleMove);
    window.addEventListener("touchend", this.handleEnd);
    window.addEventListener("mousemove", this.handleMove);
    window.addEventListener("mouseup", this.handleEnd);

    try {
        await this.getCards();
        await this.getSomeCards();
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
  },
  beforeUnmount() {
    window.removeEventListener("touchmove", this.handleMove);
    window.removeEventListener("touchend", this.handleEnd);
    window.removeEventListener("mousemove", this.handleMove);
    window.removeEventListener("mouseup", this.handleEnd);
  },
  methods: {
    async getCards() {
      this.cards = await CardsService.getCards(this.deckId);
    },
    async getSomeCards() {
      this.cardSample = _.sampleSize(this.cards, this.numOptions);
      console.log(this.cardSample[0]);
    },

    handleStart(event) {
      if (!this.canDrag) return; // Prevent dragging if canDrag is false
      this.isDragging = true;

      const pointer = event.touches?.[0] || event;
      this.startX = pointer.clientX;
      this.startY = pointer.clientY;

      const img = this.$refs.image;
      this.originaParent = img.parentElement;
      const imgRect = img.getBoundingClientRect();
      document.body.appendChild(img);

      // Set fixed position for smooth dragging
      img.style.position = "fixed";
      img.style.zIndex = "1000";
      console.log(img.clientWidth);
      this.x = imgRect.left;
      this.y = imgRect.top;
    },
    handleMove(event) {
      const pointer = event.touches?.[0] || event;
      if (this.isDragging) {
        const diffX = pointer.clientX - this.startX;
        const diffY = pointer.clientY - this.startY;
        this.x += diffX;
        this.y += diffY;
      }
      this.startX = pointer.clientX;
      this.startY = pointer.clientY;

      this.startX = pointer.clientX;
      this.startY = pointer.clientY;      
    },
    handleEnd() {
      if (!this.isDragging) return;
      this.isDragging = false;

      // Get drop zones
      const img = this.$refs.image;
      const dropZones = this.$refs.dropZones;
      let dropped = false;
      if (!dropZones) {
        this.originaParent.append(img);
        return
      }
      dropZones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        // Check if image is inside a zone
        if (
          this.startX >= rect.left &&
          this.startX <= rect.right &&
          this.startY >= rect.top &&
          this.startY <= rect.bottom
        ) {
          zone.append(img);
          this.x = 0; // Reset position relative to zone B
          this.y = 0;
          this.canDrag = false;
          dropped = true;
        }
      });
      if (!dropped) {
        this.originaParent.append(img);
      }
    },
  },
};
</script>

<template>
  <section class="play">
    <div class="player computer">
      <span class="name">PC</span>
      <div class="handplace computer">
        <img class="hand computer" src="@/assets/play/hand-red.png" />
      </div>

      <span class="score">0</span>
    </div>

    <div class="options">
      <template v-if="cardSample">
        <article v-for="(card, index) in cardSample" :key="index">
          <div ref="dropZones"></div>
          <img :src="card.image_url" alt="option" />
        </article>
      </template>
      <template v-if="!cardSample">
        <article v-for="_ in numOptions"></article>
      </template>
      <div class="infobox"></div>
    </div>

    <div class="player human">
      <span class="name">You</span>
      <div class="handplace human" ref="zoneA">
        <img
          class="hand human"
          alt="hand"
          draggable="false"
          src="@/assets/play/hand-blue.png"
          :style="{
            left: `${x}px`,
            top: `${y}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            position: isDragging ? 'absolute' : 'static',
            width: '10vh',
            height: 'auto',
          }"
          ref="image"
          @mousedown="handleStart"
          @touchstart="handleStart"
        />
      </div>

      <span class="score">0</span>
    </div>
  </section>
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

  background-image: url("@/assets/play/blackboard.webp");
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

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      div {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16vh;
      height: 16vh;
      border-radius: 50%;

      &.computer {
        border: 1vh solid red;
      }
      &.human {
        border: 1vh solid blue;
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
    width: 10vh;
    height: auto;
    z-index: 1;

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
