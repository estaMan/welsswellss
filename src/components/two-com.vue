<template>
  <div id="app" class="container mt-2">
    <!-- Countdown Card -->
    <div class="card text-center">
      <div class="card-header d-flex align-items-center justify-content-between">
        <img src="../images/avatar.jpg" class="rounded-circle" alt="Avatar 1" style="width: 100px; height: 100px" />

        <!-- Title -->
        <h3 class="mx-3">🎉🥳<strong>Save The Date</strong>🎉🥳</h3>

        <!-- Avatar After -->
        <img src="../images/avatar1.png" class="rounded-circle" alt="Avatar 2" style="width: 100px; height: 100px" />
      </div>
      <div class="card-body">
        <h5 class="card-title">Countdown to our special day! <strong>06/10/2024</strong></h5>

        <flip-countdown :deadline="deadline1" :showDays="true" @timeElapsed="timeElapsedHandler"></flip-countdown>
      </div>
    </div>

    <!-- Image Carousel -->
    <div
      style="border-radius: 30px"
      id="imageCarousel"
      class="carousel slide mt-5"
      data-ride="carousel"
      data-interval="3000"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img style="border-radius: 30px" src="../images/cr.jpg" class="d-block w-100" alt="Image 1" />
        </div>
        <div class="carousel-item">
          <img style="border-radius: 30px" src="../images/cr4.jpg" class="d-block w-100" alt="Image 2" />
        </div>
        <div class="carousel-item">
          <img style="border-radius: 30px" src="../images/cr3.jpg" class="d-block w-100" alt="Image 3" />
        </div>
        <div class="carousel-item">
          <img style="border-radius: 30px" src="../images/cr1.jpg" class="d-block w-100" alt="Image 4" />
        </div>
        <div class="carousel-item">
          <img style="border-radius: 30px" src="../images/cr5.jpg" class="d-block w-100" alt="Image 5" />
        </div>
        <div class="carousel-item">
          <img style="border-radius: 30px" src="../images/avatar2.jpg" class="d-block w-100" alt="Image 5" />
        </div>
      </div>
      <a class="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#imageCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown';
import moment from 'moment';

const fmt = 'YYYY-MM-DD HH:mm:ss';

export default {
  name: 'app',
  components: {
    FlipCountdown,
  },
  data() {
    return {
      // Set deadline1ts to the timestamp of 06/10/2024
      deadline1ts: moment('2024-10-06').valueOf(), // Using moment to create a timestamp for October 6, 2024
      deadline2: moment().add(30, 's').format(fmt),
      deadline3: moment().add(1000, 'd').add(10, 's').format(fmt),
      deadline4: moment().add(2, 'h').format(fmt),
      deadline5: moment().add(24, 'h').format(fmt),
    };
  },
  computed: {
    deadline1: function () {
      return moment(this.deadline1ts).format(fmt); // Formats the timestamp into the "YYYY-MM-DD HH:mm:ss" format
    },
  },
  methods: {
    timeElapsedHandler: function () {
      // Handle time elapsed event
    },
    extendDeadline() {
      this.deadline1ts += 10000; // Example function to extend the deadline by 10 seconds
    },
  },
};
</script>

<style>
body {
  position: relative;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../images/avatar2.jpg') no-repeat center center;
  background-size: cover;
  opacity: 0.7; /* Light opacity */
  z-index: -1;
}

#app {
  background-color: rgba(255, 255, 255, 0.85); /* Light opacity background for readability */
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
  position: relative;
  z-index: 1;
}

.carousel-item img {
  max-height: 400px;
  object-fit: cover;
}
</style>
