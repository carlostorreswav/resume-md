import { useParams } from "react-router-dom";

const Page = () => {
    let { id } = useParams();
    return <h3>Requested topic ID: {id}</h3>;
}

export default Page