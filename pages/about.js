import { getSession } from "next-auth/react";

export default function about({ user }) {
  return <h1>{user.name}</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        //リダイレクト先
        destination: "/",
        //永続的なリダイレクトかどうか
        permanent: false,
      },
    };
  }
  return {
    props: { user: session.user },
  };
}

// //サーバーからのpropsを受け取る
// export default function about({ user }) {
//   if (user) {
//     return <h1>{user.name}</h1>;
//   }
//   return <h1>No Page</h1>;
// }

// //サーバーで取得したデータをクライアントにpropsとして渡す
// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);
//   //sessionがなければ空のオブジェクトをpropsとしてクライアントに渡す
//   if (!session) {
//     return {
//       props: {},
//     };
//   }
//   //sessionがあれば{user}というpropsとしてクライアントに渡す
//   const { user } = session;
//   return {
//     props: { user },
//   };
// }
