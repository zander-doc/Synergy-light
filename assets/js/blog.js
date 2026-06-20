/* ============================================================
   SYNERGY LIGHT - Blog Functionality
   Filtrado, búsqueda, compartir en redes
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initBlogSearch();
  initBlogCategories();
  initShareButtons();
});

/* ----- BLOG SEARCH ----- */
function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  if (!searchInput) return;

  const blogCards = document.querySelectorAll('.blog-card');
  const noResults = document.querySelector('.blog-no-results');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const excerpt = card.querySelector('p')?.textContent?.toLowerCase() || '';
      const category = card.querySelector('.category-badge')?.textContent?.toLowerCase() || '';

      const matches = title.includes(query) || excerpt.includes(query) || category.includes(query);
      
      card.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

/* ----- BLOG CATEGORIES ----- */
function initBlogCategories() {
  const categoryLinks = document.querySelectorAll('.sidebar-categories a');
  if (categoryLinks.length === 0) return;

  const blogCards = document.querySelectorAll('.blog-card');

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category?.toLowerCase();

      // Update active state
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (!category || category === 'todas') {
        blogCards.forEach(card => card.style.display = 'block');
        return;
      }

      blogCards.forEach(card => {
        const cardCategory = card.querySelector('.category-badge')?.textContent?.toLowerCase() || '';
        card.style.display = cardCategory.includes(category) ? 'block' : 'none';
      });
    });
  });
}

/* ----- SHARE BUTTONS ----- */
function initShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  if (shareButtons.length === 0) return;

  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      const text = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');

      let shareUrl = '';

      if (btn.classList.contains('facebook')) {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      } else if (btn.classList.contains('twitter')) {
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
      } else if (btn.classList.contains('whatsapp')) {
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
      } else if (btn.classList.contains('email')) {
        shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}