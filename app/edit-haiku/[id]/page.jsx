import HaikuForm from "../../../components/HaikuForm";
import { getCollection } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { getUserFromCookie } from "../../../lib/getUser";
import { redirect } from "next/navigation";

async function getDoc(id) {
  const haikuCollection = await getCollection("haikus");
  const result = await haikuCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result;
}

export default async function Page(props) {
  const doc = await getDoc(props.params.id);
  const user = await getUserFromCookie();

  if (user?.userId !== doc.author.toString()) {
    return redirect("/");
  }

  return (
    <div>
      <h2 className="text-center text-5xl text-gray-600 mb-5 antialiased">
        Edit Post
      </h2>
      <HaikuForm haiku={doc} action="edit" />
    </div>
  );
}
