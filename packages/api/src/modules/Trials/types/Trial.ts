import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Trial {
  @Field()
  name: string;
  @Field()
  country: string;
  @Field()
  start_date: string;
  @Field()
  end_date: string;
  @Field()
  sponsor: string;
  @Field()
  canceled: boolean;
  @Field()
  study_type: string;
  @Field()
  primary_purpose: string;
}
