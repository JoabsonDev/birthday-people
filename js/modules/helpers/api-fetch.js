export async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);

    // TODO: talvez nem todos os status 401.
    if (response.status === 401) {
      console.warn("Sessão expirada. Redirecionando...");
      window.location.href = "/login.html";
      return;
    }

    return response;
  } catch (error) {
    console.error("Erro de rede:", error);
    throw error;
  }
}
