<template>
  <footer>
    <div class="footer-content">
      <div class="footer-hearts">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="footer-heart-alt" aria-hidden="true">
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
        </svg>
      </div>
      <p>&copy; 2026 Елизавета &amp; Денис</p>
      <p class="footer-made">Сделано с любовью</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--text-dark);
  color: var(--white);
  text-align: center;
  padding: 40px 20px 30px;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
}

.footer-hearts {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--accent);
}

.footer-heart-alt {
  opacity: 0.6;
}

.footer-made {
  font-size: 0.85rem;
  opacity: 0.5;
  margin-top: 6px;
  font-weight: 300;
}
</style>
