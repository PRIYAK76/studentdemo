export default function page({ params }) {
    return <div>TEST My post : {params.slug[0]}
        <h2>TEST My post : {params.slug[1]}</h2>
        <h2>TEST My post : {params.slug[2]}</h2>
    </div>;
}