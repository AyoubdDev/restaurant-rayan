/**
 * UTILITAIRE DE SUIVI DES CONVERSIONS - RESTAURANT RAYAN
 * Enregistre les conversions clés dans le dataLayer de Google Analytics ou GTM.
 * Fonctionne de manière 100% robuste même sans scripts externes chargés.
 */

export type AnalyticsEvent =
  | "view_menu"
  | "click_whatsapp"
  | "click_phone"
  | "click_directions"
  | "reservation_start"
  | "reservation_submit"
  | "birthday_request"
  | "social_instagram";

export function trackEvent(eventName: AnalyticsEvent, metadata: Record<string, any> = {}) {
  const timestamp = new Date().toISOString();
  
  // Log de développement propre
  console.info(`[Analytics Tracked] Event: "${eventName}"`, {
    ...metadata,
    timestamp,
    pageUrl: window.location.href
  });

  // Injecter dans le standard GTM dataLayer s'il existe
  try {
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: eventName,
        event_metadata: metadata,
        event_timestamp: timestamp
      });
    }
  } catch (err) {
    console.warn("Analytics dataLayer push failed:", err);
  }
}
