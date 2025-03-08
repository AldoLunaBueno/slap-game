<template>
  <div class="navbar navbar-expand-md navbar-dark bg-secondary">
    <div class="container-md">
      <a href="#" class="navbar-brand">
        <span class="fw-bold text-secondary text-light">
          <i class="bi bi-border-all"></i>
          <span class="ms-2">Slap Game</span>
        </span>
      </a>
      <!-- toggle button for mobile nav -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main-nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- navbar links -->
      <div class="collapse navbar-collapse justify-content-end" id="main-nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="/decks" class="nav-link">Decks</a>
          </li>
          <li class="nav-item">
            <a href="#create" class="nav-link">Create</a>
          </li>
          <li class="nav-item d-md-none">
            <a href="#pricing" class="nav-link">Pricing</a>
          </li>
          <li class="nav-item ms-2 d-none d-md-inline">
            <a href="#pricing" class="btn btn-light">Get Premium</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
