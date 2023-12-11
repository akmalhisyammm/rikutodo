export const greetingByTime = (username: string) => {
  const hour = new Date().getHours();

  if (hour < 12) return `Good morning, ${username} ☀️`;
  if (hour < 18) return `Good afternoon, ${username} 🌤️`;
  return `Good evening, ${username} 🌙`;
};
