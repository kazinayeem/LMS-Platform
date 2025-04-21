export default async function Page({
  params,
}: {
  params: Promise<{ courseid: string }>;
}) {
  const { courseid } = await params;
  return <div>My Post: {courseid}</div>;
}
