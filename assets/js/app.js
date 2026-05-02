
document.querySelectorAll('[data-mobile-button]').forEach((button) => {
  const panel = document.getElementById(button.dataset.mobileButton)
  if (!panel) return
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!expanded))
    panel.classList.toggle('hidden')
  })
})
