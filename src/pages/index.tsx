import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import { domainList } from "@/types/google_api_client/directory";
import {
  isSuccessResponse,
  SuccessResponse,
  isFailedResponse,
} from "@/types/api/response";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  type PropType = {
    data?: domainList;
    message?: string;
  };
  const props: PropType = {};
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/domain`, {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });
  const responseBody = await response.json();
  if (isSuccessResponse(responseBody)) {
    // TODO: Generics つきの type guard がうまくいかない、要検討
    const typedResponse = responseBody as SuccessResponse<domainList>;
    props.data = typedResponse.data;
  } else if (isFailedResponse(responseBody)) {
    props.message = responseBody.message;
  } else {
    props.message = "Fatal error. Failed to get domains.";
  }

  return { props };
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props.data && props.message) {
    return (
      <>
        <div>{props.message}</div>
      </>
    );
  }

  return (
    <>
      {props.data!.domains.map((domain) => (
        <Card key={domain.etag}>
          <CardActionArea href={`/${domain.domainName}`}>
            <CardHeader
              title={domain.domainName}
              subheader={`etag: ${domain.etag}`}
            />
          </CardActionArea>
        </Card>
      ))}
    </>
  );
}
