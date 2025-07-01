export async function generateSlide() {
  const res = await fetch('http://localhost:3001/api/generate-slide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function getTeacherCommentary(
  speech: string,
  slideTitle: string,
  secretGoal: string,
  goalCompleted: boolean
) {
  const res = await fetch('http://localhost:3001/api/commentary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ speech, slideTitle, secretGoal, goalCompleted }),
  });
  return res.json();
}