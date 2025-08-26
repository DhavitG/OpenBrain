export function random(len: number) {
  let options = "biurpeqbvuiebveiubnvubvnu893h4g93";
  const optionsLength = options.length;
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * optionsLength)];
  }

  return ans;
}
