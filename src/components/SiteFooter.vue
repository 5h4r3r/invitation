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
    <div class="footer-contacts">
      <p class="footer-contacts-text">
        Если у вас остались вопросы, или вы бы хотели организовать творческое поздравление,<br>
        можете обратиться к нашим организаторам:
      </p>
      <div class="footer-phones">
        <a href="tel:+79058508050">8 905 850 80 50 Татьяна</a>
        <a href="tel:+79195654929">8 919 565 49 29 Ксения</a>
      </div>
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

.footer-contacts {
  max-width: 500px;
  margin: 32px auto 0;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-contacts-text {
  font-size: 0.9rem;
  opacity: 0.7;
  font-weight: 300;
  line-height: 1.6;
}

.footer-phones {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.footer-phones a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}

.footer-phones a:hover {
  opacity: 0.8;
}
</style>
