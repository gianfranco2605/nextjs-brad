import { getCollection } from "../lib/db";
import { ObjectId } from "mongodb";

async function getHaikus(id) {
  const collection = await getCollection("haikus");
  const results = await collection
    .find({ author: ObjectId.createFromHexString(id) })
    .sort()
    .toArray();
  console.log(results);

  return results;
}

export default async function Dashboard(props) {
  const haikus = await getHaikus(props.user.userId);

  return (
    <div>
      <h2 className=" text-center text-2xl text-gray-600 mb-5">Your Haikus</h2>
      {haikus.map((haiku, index) => {
        return (
          <div key={index}>
            {haiku.line1}
            <br />
            {haiku.line2}
            <br />
            {haiku.line3}
            <br />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
