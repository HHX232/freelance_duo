export const sendTmrEvent = (goal: string, productId: string, value = 'VALUE') => {
  const trackEvent = () => {
    if (typeof window._tmr !== 'undefined') {
      console.log("Sending event:", goal, productId, value);
      window._tmr.push({
        type: 'reachGoal',
        id: 3523372,
        value: value,
        goal: goal,
        params: { product_id: productId }
      });
    } else {
      const interval = setInterval(() => {
        if (typeof window._tmr !== 'undefined') {
          console.log("Sending event after interval:", goal, productId, value);
          window._tmr.push({
            type: 'reachGoal',
            id: 3523372,
            value: value,
            goal: goal,
            params: { product_id: productId }
          });
          clearInterval(interval);
        }
      }, 500);
    }
  };

  trackEvent();
};
