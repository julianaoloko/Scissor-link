import { getFirestore, collection, addDoc, Timestamp, getDocs, deleteDoc, doc, setDoc, updateDoc, increment, getDoc, query, where  } from 'firebase/firestore';
import { auth } from '../firebase/config'; 
import { nanoid } from 'nanoid';
import { LinkDetails, CreateLink } from '../lib/type';
const db = getFirestore(); 
export const handleCreateShortenLink = async (name: string, link: string) => {
  return new Promise<CreateLink>(async (resolve, reject) => {
    const user = auth.currentUser;
    if (!auth.currentUser) {
        reject(new Error("User is not authenticated."));
        return;
    }

    // const slugRex = /^[a-zA-Z0-9-_]{5,15}$/;

    // if(customSlug && !slugRex.test(customSlug)){
    //   console.error("Custom Slug is invalid");
    //   reject(new Error("Custom slug must be 5-15 characters long, contain only letters, numbers, and underscores, and must not contain spaces."));
    //   return;
    // }

    const data = {
        name,
        link,
        shortLink: nanoid(6),
        createdAt: Timestamp.now(), 
        clicks: 0,
    };
    const userId = user?.uid;

    try {
    //   if (customSlug) {
    //     const customSlugCollection = collection(db, "customSlugs");
    //     const customSlugDoc = doc(customSlugCollection, customSlug);
    //     const customSlugSnapshot = await getDoc(customSlugDoc);

    //     if (customSlugSnapshot.exists()) {
    //         console.error("Custom Slug already exists");
    //         reject(new Error("Custom Slug already exists"));
    //         return; 
    //     }
    //   }
      const userLinksCollection = collection(db, "users", userId ?? "", "links");
      const resp = await addDoc(userLinksCollection, data);
      const publicLinkData = {
        link,
        userId: user?.uid,
        linkId: resp.id ,
      };

      const publicLinksCollection = collection(db, "links");
      await setDoc(doc(publicLinksCollection, data.shortLink), publicLinkData);

    //   if (customSlug){
    //     console.log(Creating document with customSlug: ${customSlug});
    //     const customSlugCollection = collection(db, "customSlugs");
    //     await setDoc(doc(customSlugCollection, customSlug), publicLinkData);
    //   }
      resolve(data)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  });

};
export async function handleGetLinks() {
  return new Promise<LinkDetails[]>((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        reject("User is not authenticated.");
        return;
      }

      try {
        const userLinksCollection = collection(db, "users", user.uid, "links");
        const querySnapshot = await getDocs(userLinksCollection);
        
        if (querySnapshot.empty) {
          console.log("No links found.");
          resolve([]);
        } else {
          const userData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            name: doc.data().name,
            link: doc.data().link,
            shortLink: doc.data().shortLink,
            clicks: doc.data().clicks,
            createdAt: doc.data().createdAt,
          }));
          resolve(userData);
        }
      } catch (e) {
        console.error("Error getting documents: ", e);
        reject(e);
      }
    });
  });
  
}

export const redirectLink = async (slug: string) => {
  try {
        const docRef = doc(db, "links", slug);
        const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data(), docSnap.data().linkId, docSnap.data().userId);

    } else {
      console.log("No such document!");
    }
      const { linkId, userId } = docSnap.data()  as { linkId: string, userId: string };
      const userLinkDoc = doc(db, "users", userId, "links", linkId);

      await updateDoc(userLinkDoc, { clicks: increment(1) });
      console.log("Document updated.");


      let link = docSnap.data()?.link;

      try {
        new URL(link);
      } catch (e) {
        link = 'https://' + link;
      }
  
      window.location.href = link;
  } catch (e) {
      console.error("Error getting document: ", e);
      throw e;
 }
}
