import { Field, InputType } from "type-graphql";

@InputType()
export class TrialsFilter {
  @Field({ nullable: true })
  sponsor?: string;

  @Field({ nullable: true })
  countryCode?: string;
}
