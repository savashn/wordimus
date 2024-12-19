import { Category, Post } from "@/types/interfaces";
import { Params } from "@/types/types";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.css";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/partials/ProgressBar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = await params;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    let admin;

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);

        if (decodedToken.username === slug.user) {
            admin = decodedToken.username
        }
    }

    const res = await fetch(`${api}/user/${slug.user}/posts/${slug.post}`);

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    const data = await res.json();

    const post: Post = data.post;
    const categories: Category[] = data.categories;

    return (
        <div>
            <ProgressBar />
            <div className={styles.profileContainer}>
                <div className={styles.pictureWrapper}>
                    <Image
                        src="/profile.jpg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className={styles.picture}
                    />
                </div>
                <p className={styles.author}>{post.author}</p>
            </div>

            {admin && (
                <Link href={`/user/${slug.user}/posts/${slug.post}/edit`} className={styles.link}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button}>EDIT THIS POST</button>
                    </div>
                </Link>
            )}

            <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString('en-GB')}</p>

            <h1 className={styles.h1}>{post.header}</h1>
            <p className={styles.readingTime}>Reading Time: {post.readingTime} minute</p>

            {categories && categories.length > 0 && categories.map((cat, idx) => (
                <div key={idx}>
                    <Link href={`user/${slug.user}/categories/${cat.slug}`} className={styles.link}>
                        {cat.category}
                    </Link>
                </div>
            ))}


            <hr /><br />

            <div className={styles.content}>
                {post.content}
            </div>

            <br />

            <div className={styles.content}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum saepe est, iste beatae dolorum aperiam ducimus nemo corporis animi nostrum odio commodi pariatur! Tempora doloremque pariatur repellat aut aliquam, nemo vero iusto debitis quaerat culpa. Eos accusamus sint saepe. Asperiores beatae facilis placeat, quisquam alias necessitatibus reprehenderit quaerat. Illo aliquam ab neque quibusdam dolorum eius, qui, libero aliquid modi est quas fugit quod veniam. Mollitia iusto dolorem animi, accusantium modi sunt. Nam numquam dignissimos beatae nostrum ratione molestiae, exercitationem minima eaque aliquid possimus perspiciatis assumenda quos perferendis nisi iure laboriosam expedita pariatur praesentium. Repudiandae odio, corrupti distinctio et corporis voluptatum cumque iste placeat quas. Provident a natus quia, magni quisquam vitae voluptate minima est id ducimus eius dolorem delectus, eos veritatis corrupti excepturi assumenda, temporibus unde sequi repellat enim adipisci nobis! Enim aliquid quibusdam eius hic esse recusandae, eligendi ipsam harum ad delectus illum exercitationem impedit id numquam deleniti, fugiat, asperiores ipsum laboriosam iusto corporis consequuntur excepturi doloremque repellat placeat? Esse explicabo ullam possimus aspernatur at! Dolorum expedita praesentium ab consequatur quis tenetur vero, quaerat quod culpa atque placeat nisi repellat odit inventore repellendus assumenda mollitia obcaecati est dignissimos laborum aliquam porro sed! Aperiam voluptatum nemo ex eaque tempore inventore sit quos officia ipsam tenetur mollitia nulla, neque consequatur ratione iure nesciunt animi voluptates ut, corporis aspernatur eveniet exercitationem amet ducimus. Nostrum sapiente qui provident tempore. Quaerat officia facilis tempore quas quod, repudiandae consectetur doloribus maiores. Nobis hic obcaecati non dolores, veritatis soluta porro quia illo itaque labore laboriosam quos laudantium cupiditate laborum doloremque fuga id sequi, nostrum aperiam reiciendis molestias quaerat dignissimos perferendis placeat? Inventore eum expedita laboriosam maxime labore aliquam ipsa facere fuga dignissimos quisquam consequatur vitae, reprehenderit eius? Quae commodi aut placeat nemo libero nam error quibusdam aliquid, adipisci quam quas ex accusamus sunt, rerum voluptatibus similique autem dicta? Maiores dolorum deleniti tempore magnam doloribus voluptatibus assumenda quisquam! Consequuntur placeat nesciunt laudantium illo harum optio non dolores odio maiores ipsa labore ducimus minus, aut quae eum est officiis, earum iusto? Itaque tempora expedita ex dolorum eligendi! At, est quasi nisi nulla neque iste magnam. Consequatur dignissimos rem, doloribus inventore, sapiente ipsam dolores magnam in suscipit alias, accusamus quas unde molestiae. Earum fuga dolore quisquam vero officia nisi deserunt a impedit doloremque odio incidunt esse, in ut libero nostrum itaque nobis accusantium blanditiis magnam ipsam vel eos similique dicta necessitatibus? Qui labore eum, quia, itaque nihil voluptatum harum alias error ullam vero dignissimos quam libero dolorem, doloremque dolores. Esse non magnam temporibus earum aliquid architecto, quae qui tempore magni iste sunt saepe dolor? Obcaecati reiciendis corrupti architecto eos asperiores sint voluptas itaque dolorem? Reprehenderit dolorum, vero fugit cupiditate quae, modi aut commodi esse, quo exercitationem architecto ex. Magnam itaque dolore excepturi eius modi dolores nihil tempore, nemo veniam ut fuga sapiente necessitatibus numquam consectetur consequuntur omnis accusamus reprehenderit, facere mollitia voluptatum quas. Architecto, consequatur, doloribus accusantium ullam amet iure illo, beatae ut ipsum provident laborum asperiores delectus similique labore quam neque aliquid magni laudantium quisquam ducimus! Non, in nulla dolorem neque ullam aperiam temporibus quaerat expedita iusto magni unde similique ipsa consequatur? Vero dolorem autem totam voluptates reprehenderit, itaque ex rem adipisci fuga pariatur! Dolores voluptate recusandae, distinctio aperiam consequuntur voluptatibus laborum sunt pariatur delectus doloremque obcaecati. Quidem temporibus atque et tempora unde ipsa ullam eos, quibusdam iusto aspernatur recusandae consectetur beatae rem inventore, dolor corrupti numquam illo, eum aperiam dolores! Earum sed illo voluptatibus accusamus corrupti facilis consequatur, repellat vitae dolor, adipisci delectus ullam quasi voluptas amet ea quidem. Fuga doloremque accusantium, et ratione explicabo aut nostrum nulla impedit reprehenderit, cum velit nobis, sequi iste. Culpa autem quo vitae illo aperiam iusto doloremque reiciendis animi suscipit, eligendi perspiciatis, pariatur quibusdam minus repellat asperiores laborum. Qui quaerat quo dolores iusto, doloribus pariatur. Perferendis in quod ullam inventore, quia commodi est itaque quasi harum, quam odit expedita. Odit praesentium minus pariatur nemo doloribus velit sunt. Quis molestias vitae nemo itaque quae illo! Adipisci enim quis corrupti molestias reiciendis quia voluptatem assumenda explicabo sed qui dolorem repellat sunt obcaecati, repellendus dicta. Consequuntur quos, soluta quia reprehenderit quisquam maxime rem, vel inventore cupiditate similique impedit? Neque odit quibusdam incidunt quasi, saepe aliquam, ratione minima optio necessitatibus veritatis asperiores ab? Nemo inventore magnam vero. Dicta adipisci sint consectetur provident deserunt minima sapiente explicabo unde quibusdam odit eius officia voluptas eos tempore, ea earum aut ipsum ratione amet, qui facilis ipsa magni! Quibusdam, sequi itaque molestiae soluta libero consequatur eius a ex eaque voluptates veritatis adipisci magnam atque mollitia sint iste fugit sed unde optio deserunt officia autem! Hic id dolorum deleniti vitae exercitationem nostrum consequuntur placeat perspiciatis officiis, quis amet beatae eos sapiente tempora laudantium aliquid rem porro at magni quas tenetur nobis consequatur! Ut sapiente repudiandae dicta laboriosam quod unde facere cum, a vel! Deleniti illo iste delectus vitae ipsa nisi, eligendi nihil ex asperiores, accusamus voluptatem, placeat blanditiis! Similique dignissimos quia, vero asperiores sint excepturi quaerat officia ex repellendus, ad reprehenderit ea eos minus ut! Officiis consequuntur nesciunt excepturi. Voluptas natus repudiandae ab, laudantium, deserunt odit consectetur nihil nemo maiores cupiditate aliquam deleniti hic aliquid distinctio consequatur ad, quisquam rem iste! Tempore ipsum similique iste atque est, debitis odit laudantium magnam quam commodi aperiam voluptate consequuntur voluptates laborum eveniet, tenetur aliquid sapiente nesciunt quo provident, fugit suscipit dolorum nobis quos. Possimus distinctio quod non rerum laboriosam repudiandae voluptatibus similique aut officia molestias. Quisquam consequatur modi cumque ipsa vel, reiciendis aliquam doloremque corporis unde, quasi eos ipsum minus! Impedit fugiat doloribus repudiandae velit omnis quos, pariatur eius recusandae dolor, ut voluptatem odio repellat hic praesentium blanditiis illum, ad sit. Aperiam, mollitia. Itaque, omnis? Tempore unde officia natus nulla, esse sed aut consequatur, aliquam odio consectetur voluptate sint! Qui eaque id possimus aliquam necessitatibus facere at, iure ab mollitia error assumenda in commodi, vero hic, totam nihil. Eum nisi dolorum possimus non odit accusantium. Pariatur voluptatem nulla adipisci, doloribus vero distinctio quod in iste voluptates? Asperiores optio facilis quos ratione assumenda repellat at officia! Officiis porro eum facere pariatur consequatur nam accusantium.
            </div>
        </div>
    )
}