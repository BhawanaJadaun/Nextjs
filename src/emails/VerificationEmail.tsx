import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";
interface VerificationEmailProps {
  username: string;
  otp: string;
}
export default function VerificationEmail({
  username,
  otp,
}: VerificationEmail) {
  <Html lang="en" dir="ltr">
    <Head>
      <title>Verification Code</title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Here&apos;s your verification code:{otp}</Preview>
    <Preview>
      <Section>
        <Row>
          <Heading as="H2">Hello {Username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering, Please use following Verification code to
            complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>If u did not request this code pls ignore this email.</Text>
        </Row>
        <Button
          href="https://example.com"
          style={{ color: "#61dafb", padding: "10px 20px" }}
        >
          Verify here
        </Button>
      </Section>
    </Preview>
  </Html>;
}
