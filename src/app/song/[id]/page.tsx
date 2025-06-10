// import ChordTable from "@/components/ChordTable";
import ChordTable from "@/components/ChordTable";
import Lines from "@/components/shared/Lines";
type PageProps ={
  params:any
}

const Page:React.FC<PageProps>=({ params })=> {
  return <Lines id={params.id} />;
  // return <ChordTable id={params.id} />;
}
export default Page