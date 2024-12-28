import { getMe } from "application/use-cases/user";
import CardProfile from "../components/CardProfile";

export default async function ProfileUser() {
  const me = await getMe();
  return (
    <div className="flex gap-2 p-4">
      <CardProfile user={me} />
      <div className="w-full">h</div>
    </div>
  );
}
