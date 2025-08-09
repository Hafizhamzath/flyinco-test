import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../UI/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../UI/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../UI/select";

// If you're not using toast notifications, you can remove this and replace with console.log or alert
// import { toast } from "../../hooks/use-toast";

const visaFormSchema = z.object({
  destinationCountry: z.string({ required_error: "Please select a country." }),
  nationality: z.string({ required_error: "Please select your nationality." }),
  visaType: z.string({ required_error: "Please select a visa type." }),
});

export function VisaForm() {
  const form = useForm({
    resolver: zodResolver(visaFormSchema),
  });
  const navigate = useNavigate();
   const onSubmit = (data) => {
    // Go to /visa/apply and send the form data
    navigate("/visa", { state: data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="destinationCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="af">Afghanistan</SelectItem>
                  <SelectItem value="al">Albania</SelectItem>
                  <SelectItem value="dz">Algeria</SelectItem>
                  <SelectItem value="as">American Samoa</SelectItem>
                  <SelectItem value="ad">Andorra</SelectItem>
                  <SelectItem value="ao">Angola</SelectItem>
                  <SelectItem value="ai">Anguilla</SelectItem>
                  <SelectItem value="aq">Antarctica</SelectItem>
                  <SelectItem value="ag">Antigua and Barbuda</SelectItem>
                  <SelectItem value="ar">Argentina</SelectItem>
                  <SelectItem value="am">Armenia</SelectItem>
                  <SelectItem value="aw">Aruba</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="at">Austria</SelectItem>
                  <SelectItem value="az">Azerbaijan</SelectItem>
                  <SelectItem value="bs">Bahamas</SelectItem>
                  <SelectItem value="bh">Bahrain</SelectItem>
                  <SelectItem value="bd">Bangladesh</SelectItem>
                  <SelectItem value="bb">Barbados</SelectItem>
                  <SelectItem value="by">Belarus</SelectItem>
                  <SelectItem value="be">Belgium</SelectItem>
                  <SelectItem value="bz">Belize</SelectItem>
                  <SelectItem value="bj">Benin</SelectItem>
                  <SelectItem value="bm">Bermuda</SelectItem>
                  <SelectItem value="bt">Bhutan</SelectItem>
                  <SelectItem value="bo">Bolivia</SelectItem>
                  <SelectItem value="ba">Bosnia and Herzegovina</SelectItem>
                  <SelectItem value="bw">Botswana</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                  <SelectItem value="bn">Brunei</SelectItem>
                  <SelectItem value="bg">Bulgaria</SelectItem>
                  <SelectItem value="bf">Burkina Faso</SelectItem>
                  <SelectItem value="bi">Burundi</SelectItem>
                  <SelectItem value="kh">Cambodia</SelectItem>
                  <SelectItem value="cm">Cameroon</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="cv">Cape Verde</SelectItem>
                  <SelectItem value="cf">Central African Republic</SelectItem>
                  <SelectItem value="td">Chad</SelectItem>
                  <SelectItem value="cl">Chile</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="km">Comoros</SelectItem>
                  <SelectItem value="cg">Congo</SelectItem>
                  <SelectItem value="cd">Congo (Democratic Republic)</SelectItem>
                  <SelectItem value="cr">Costa Rica</SelectItem>
                  <SelectItem value="hr">Croatia</SelectItem>
                  <SelectItem value="cu">Cuba</SelectItem>
                  <SelectItem value="cy">Cyprus</SelectItem>
                  <SelectItem value="cz">Czech Republic</SelectItem>
                  <SelectItem value="dk">Denmark</SelectItem>
                  <SelectItem value="dj">Djibouti</SelectItem>
                  <SelectItem value="dm">Dominica</SelectItem>
                  <SelectItem value="do">Dominican Republic</SelectItem>
                  <SelectItem value="ec">Ecuador</SelectItem>
                  <SelectItem value="eg">Egypt</SelectItem>
                  <SelectItem value="sv">El Salvador</SelectItem>
                  <SelectItem value="gq">Equatorial Guinea</SelectItem>
                  <SelectItem value="er">Eritrea</SelectItem>
                  <SelectItem value="ee">Estonia</SelectItem>
                  <SelectItem value="et">Ethiopia</SelectItem>
                  <SelectItem value="fj">Fiji</SelectItem>
                  <SelectItem value="fi">Finland</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ga">Gabon</SelectItem>
                  <SelectItem value="gm">Gambia</SelectItem>
                  <SelectItem value="ge">Georgia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="gh">Ghana</SelectItem>
                  <SelectItem value="gr">Greece</SelectItem>
                  <SelectItem value="gd">Grenada</SelectItem>
                  <SelectItem value="gt">Guatemala</SelectItem>
                  <SelectItem value="gn">Guinea</SelectItem>
                  <SelectItem value="gy">Guyana</SelectItem>
                  <SelectItem value="ht">Haiti</SelectItem>
                  <SelectItem value="hn">Honduras</SelectItem>
                  <SelectItem value="hu">Hungary</SelectItem>
                  <SelectItem value="is">Iceland</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="ir">Iran</SelectItem>
                  <SelectItem value="iq">Iraq</SelectItem>
                  <SelectItem value="ie">Ireland</SelectItem>
                  <SelectItem value="il">Israel</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                  <SelectItem value="jm">Jamaica</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="jo">Jordan</SelectItem>
                  <SelectItem value="kz">Kazakhstan</SelectItem>
                  <SelectItem value="ke">Kenya</SelectItem>
                  <SelectItem value="ki">Kiribati</SelectItem>
                  <SelectItem value="kr">Korea, South</SelectItem>
                  <SelectItem value="kw">Kuwait</SelectItem>
                  <SelectItem value="kg">Kyrgyzstan</SelectItem>
                  <SelectItem value="la">Laos</SelectItem>
                  <SelectItem value="lv">Latvia</SelectItem>
                  <SelectItem value="lb">Lebanon</SelectItem>
                  <SelectItem value="ls">Lesotho</SelectItem>
                  <SelectItem value="lr">Liberia</SelectItem>
                  <SelectItem value="ly">Libya</SelectItem>
                  <SelectItem value="li">Liechtenstein</SelectItem>
                  <SelectItem value="lt">Lithuania</SelectItem>
                  <SelectItem value="lu">Luxembourg</SelectItem>
                  <SelectItem value="mg">Madagascar</SelectItem>
                  <SelectItem value="mw">Malawi</SelectItem>
                  <SelectItem value="my">Malaysia</SelectItem>
                  <SelectItem value="mv">Maldives</SelectItem>
                  <SelectItem value="ml">Mali</SelectItem>
                  <SelectItem value="mt">Malta</SelectItem>
                  <SelectItem value="mh">Marshall Islands</SelectItem>
                  <SelectItem value="mr">Mauritania</SelectItem>
                  <SelectItem value="mu">Mauritius</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                  <SelectItem value="md">Moldova</SelectItem>
                  <SelectItem value="mc">Monaco</SelectItem>
                  <SelectItem value="mn">Mongolia</SelectItem>
                  <SelectItem value="me">Montenegro</SelectItem>
                  <SelectItem value="ma">Morocco</SelectItem>
                  <SelectItem value="mz">Mozambique</SelectItem>
                  <SelectItem value="mm">Myanmar</SelectItem>
                  <SelectItem value="na">Namibia</SelectItem>
                  <SelectItem value="np">Nepal</SelectItem>
                  <SelectItem value="nl">Netherlands</SelectItem>
                  <SelectItem value="nz">New Zealand</SelectItem>
                  <SelectItem value="ni">Nicaragua</SelectItem>
                  <SelectItem value="ne">Niger</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="no">Norway</SelectItem>
                  <SelectItem value="om">Oman</SelectItem>
                  <SelectItem value="pk">Pakistan</SelectItem>
                  <SelectItem value="pw">Palau</SelectItem>
                  <SelectItem value="pa">Panama</SelectItem>
                  <SelectItem value="pg">Papua New Guinea</SelectItem>
                  <SelectItem value="py">Paraguay</SelectItem>
                  <SelectItem value="pe">Peru</SelectItem>
                  <SelectItem value="ph">Philippines</SelectItem>
                  <SelectItem value="pl">Poland</SelectItem>
                  <SelectItem value="pt">Portugal</SelectItem>
                  <SelectItem value="qa">Qatar</SelectItem>
                  <SelectItem value="ro">Romania</SelectItem>
                  <SelectItem value="ru">Russia</SelectItem>
                  <SelectItem value="rw">Rwanda</SelectItem>
                  <SelectItem value="kn">Saint Kitts and Nevis</SelectItem>
                  <SelectItem value="lc">Saint Lucia</SelectItem>
                  <SelectItem value="vc">Saint Vincent and the Grenadines</SelectItem>
                  <SelectItem value="ws">Samoa</SelectItem>
                  <SelectItem value="sm">San Marino</SelectItem>
                  <SelectItem value="st">Sao Tome and Principe</SelectItem>
                  <SelectItem value="sa">Saudi Arabia</SelectItem>
                  <SelectItem value="sn">Senegal</SelectItem>
                  <SelectItem value="rs">Serbia</SelectItem>
                  <SelectItem value="sc">Seychelles</SelectItem>
                  <SelectItem value="sl">Sierra Leone</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="sk">Slovakia</SelectItem>
                  <SelectItem value="si">Slovenia</SelectItem>
                  <SelectItem value="sb">Solomon Islands</SelectItem>
                  <SelectItem value="so">Somalia</SelectItem>
                  <SelectItem value="za">South Africa</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="lk">Sri Lanka</SelectItem>
                  <SelectItem value="sd">Sudan</SelectItem>
                  <SelectItem value="sr">Suriname</SelectItem>
                  <SelectItem value="se">Sweden</SelectItem>
                  <SelectItem value="ch">Switzerland</SelectItem>
                  <SelectItem value="sy">Syria</SelectItem>
                  <SelectItem value="tw">Taiwan</SelectItem>
                  <SelectItem value="tj">Tajikistan</SelectItem>
                  <SelectItem value="tz">Tanzania</SelectItem>
                  <SelectItem value="th">Thailand</SelectItem>
                  <SelectItem value="tl">Timor-Leste</SelectItem>
                  <SelectItem value="tg">Togo</SelectItem>
                  <SelectItem value="to">Tonga</SelectItem>
                  <SelectItem value="tt">Trinidad and Tobago</SelectItem>
                  <SelectItem value="tn">Tunisia</SelectItem>
                  <SelectItem value="tr">Turkey</SelectItem>
                  <SelectItem value="tm">Turkmenistan</SelectItem>
                  <SelectItem value="ug">Uganda</SelectItem>
                  <SelectItem value="ua">Ukraine</SelectItem>
                  <SelectItem value="ae">United Arab Emirates</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uy">Uruguay</SelectItem>
                  <SelectItem value="uz">Uzbekistan</SelectItem>
                  <SelectItem value="vu">Vanuatu</SelectItem>
                  <SelectItem value="ve">Venezuela</SelectItem>
                  <SelectItem value="vn">Vietnam</SelectItem>
                  <SelectItem value="ye">Yemen</SelectItem>
                  <SelectItem value="zm">Zambia</SelectItem>
                  <SelectItem value="zw">Zimbabwe</SelectItem>
                </SelectContent>

                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Nationality" />
                    </SelectTrigger>
                  </FormControl>
                    <SelectContent>
                      <SelectItem value="af">Afghanistan</SelectItem>
                      <SelectItem value="al">Albania</SelectItem>
                      <SelectItem value="dz">Algeria</SelectItem>
                      <SelectItem value="ad">Andorra</SelectItem>
                      <SelectItem value="ao">Angola</SelectItem>
                      <SelectItem value="ag">Antigua and Barbuda</SelectItem>
                      <SelectItem value="ar">Argentina</SelectItem>
                      <SelectItem value="am">Armenia</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="at">Austria</SelectItem>
                      <SelectItem value="az">Azerbaijan</SelectItem>
                      <SelectItem value="bs">Bahamas</SelectItem>
                      <SelectItem value="bh">Bahrain</SelectItem>
                      <SelectItem value="bd">Bangladesh</SelectItem>
                      <SelectItem value="bb">Barbados</SelectItem>
                      <SelectItem value="by">Belarus</SelectItem>
                      <SelectItem value="be">Belgium</SelectItem>
                      <SelectItem value="bz">Belize</SelectItem>
                      <SelectItem value="bj">Benin</SelectItem>
                      <SelectItem value="bt">Bhutan</SelectItem>
                      <SelectItem value="bo">Bolivia</SelectItem>
                      <SelectItem value="ba">Bosnia and Herzegovina</SelectItem>
                      <SelectItem value="bw">Botswana</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="bn">Brunei</SelectItem>
                      <SelectItem value="bg">Bulgaria</SelectItem>
                      <SelectItem value="bf">Burkina Faso</SelectItem>
                      <SelectItem value="bi">Burundi</SelectItem>
                      <SelectItem value="cv">Cabo Verde</SelectItem>
                      <SelectItem value="kh">Cambodia</SelectItem>
                      <SelectItem value="cm">Cameroon</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="cf">Central African Republic</SelectItem>
                      <SelectItem value="td">Chad</SelectItem>
                      <SelectItem value="cl">Chile</SelectItem>
                      <SelectItem value="cn">China</SelectItem>
                      <SelectItem value="co">Colombia</SelectItem>
                      <SelectItem value="km">Comoros</SelectItem>
                      <SelectItem value="cg">Congo (Brazzaville)</SelectItem>
                      <SelectItem value="cd">Congo (Kinshasa)</SelectItem>
                      <SelectItem value="cr">Costa Rica</SelectItem>
                      <SelectItem value="ci">Côte d’Ivoire</SelectItem>
                      <SelectItem value="hr">Croatia</SelectItem>
                      <SelectItem value="cu">Cuba</SelectItem>
                      <SelectItem value="cy">Cyprus</SelectItem>
                      <SelectItem value="cz">Czech Republic</SelectItem>
                      <SelectItem value="dk">Denmark</SelectItem>
                      <SelectItem value="dj">Djibouti</SelectItem>
                      <SelectItem value="dm">Dominica</SelectItem>
                      <SelectItem value="do">Dominican Republic</SelectItem>
                      <SelectItem value="ec">Ecuador</SelectItem>
                      <SelectItem value="eg">Egypt</SelectItem>
                      <SelectItem value="sv">El Salvador</SelectItem>
                      <SelectItem value="gq">Equatorial Guinea</SelectItem>
                      <SelectItem value="er">Eritrea</SelectItem>
                      <SelectItem value="ee">Estonia</SelectItem>
                      <SelectItem value="sz">Eswatini</SelectItem>
                      <SelectItem value="et">Ethiopia</SelectItem>
                      <SelectItem value="fj">Fiji</SelectItem>
                      <SelectItem value="fi">Finland</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="ga">Gabon</SelectItem>
                      <SelectItem value="gm">Gambia</SelectItem>
                      <SelectItem value="ge">Georgia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="gh">Ghana</SelectItem>
                      <SelectItem value="gr">Greece</SelectItem>
                      <SelectItem value="gd">Grenada</SelectItem>
                      <SelectItem value="gt">Guatemala</SelectItem>
                      <SelectItem value="gn">Guinea</SelectItem>
                      <SelectItem value="gw">Guinea-Bissau</SelectItem>
                      <SelectItem value="gy">Guyana</SelectItem>
                      <SelectItem value="ht">Haiti</SelectItem>
                      <SelectItem value="hn">Honduras</SelectItem>
                      <SelectItem value="hu">Hungary</SelectItem>
                      <SelectItem value="is">Iceland</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="id">Indonesia</SelectItem>
                      <SelectItem value="ir">Iran</SelectItem>
                      <SelectItem value="iq">Iraq</SelectItem>
                      <SelectItem value="ie">Ireland</SelectItem>
                      <SelectItem value="il">Israel</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                      <SelectItem value="jm">Jamaica</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="jo">Jordan</SelectItem>
                      <SelectItem value="kz">Kazakhstan</SelectItem>
                      <SelectItem value="ke">Kenya</SelectItem>
                      <SelectItem value="ki">Kiribati</SelectItem>
                      <SelectItem value="kr">Korea, South</SelectItem>
                      <SelectItem value="kw">Kuwait</SelectItem>
                      <SelectItem value="kg">Kyrgyzstan</SelectItem>
                      <SelectItem value="la">Laos</SelectItem>
                      <SelectItem value="lv">Latvia</SelectItem>
                      <SelectItem value="lb">Lebanon</SelectItem>
                      <SelectItem value="ls">Lesotho</SelectItem>
                      <SelectItem value="lr">Liberia</SelectItem>
                      <SelectItem value="ly">Libya</SelectItem>
                      <SelectItem value="li">Liechtenstein</SelectItem>
                      <SelectItem value="lt">Lithuania</SelectItem>
                      <SelectItem value="lu">Luxembourg</SelectItem>
                      <SelectItem value="mg">Madagascar</SelectItem>
                      <SelectItem value="mw">Malawi</SelectItem>
                      <SelectItem value="my">Malaysia</SelectItem>
                      <SelectItem value="mv">Maldives</SelectItem>
                      <SelectItem value="ml">Mali</SelectItem>
                      <SelectItem value="mt">Malta</SelectItem>
                      <SelectItem value="mh">Marshall Islands</SelectItem>
                      <SelectItem value="mr">Mauritania</SelectItem>
                      <SelectItem value="mu">Mauritius</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                      <SelectItem value="fm">Micronesia</SelectItem>
                      <SelectItem value="md">Moldova</SelectItem>
                      <SelectItem value="mc">Monaco</SelectItem>
                      <SelectItem value="mn">Mongolia</SelectItem>
                      <SelectItem value="me">Montenegro</SelectItem>
                      <SelectItem value="ma">Morocco</SelectItem>
                      <SelectItem value="mz">Mozambique</SelectItem>
                      <SelectItem value="mm">Myanmar</SelectItem>
                      <SelectItem value="na">Namibia</SelectItem>
                      <SelectItem value="nr">Nauru</SelectItem>
                      <SelectItem value="np">Nepal</SelectItem>
                      <SelectItem value="nl">Netherlands</SelectItem>
                      <SelectItem value="nz">New Zealand</SelectItem>
                      <SelectItem value="ni">Nicaragua</SelectItem>
                      <SelectItem value="ne">Niger</SelectItem>
                      <SelectItem value="ng">Nigeria</SelectItem>
                      <SelectItem value="mk">North Macedonia</SelectItem>
                      <SelectItem value="no">Norway</SelectItem>
                      <SelectItem value="om">Oman</SelectItem>
                      <SelectItem value="pk">Pakistan</SelectItem>
                      <SelectItem value="pw">Palau</SelectItem>
                      <SelectItem value="pa">Panama</SelectItem>
                      <SelectItem value="pg">Papua New Guinea</SelectItem>
                      <SelectItem value="py">Paraguay</SelectItem>
                      <SelectItem value="pe">Peru</SelectItem>
                      <SelectItem value="ph">Philippines</SelectItem>
                      <SelectItem value="pl">Poland</SelectItem>
                      <SelectItem value="pt">Portugal</SelectItem>
                      <SelectItem value="qa">Qatar</SelectItem>
                      <SelectItem value="ro">Romania</SelectItem>
                      <SelectItem value="ru">Russia</SelectItem>
                      <SelectItem value="rw">Rwanda</SelectItem>
                      <SelectItem value="kn">Saint Kitts and Nevis</SelectItem>
                      <SelectItem value="lc">Saint Lucia</SelectItem>
                      <SelectItem value="vc">Saint Vincent and the Grenadines</SelectItem>
                      <SelectItem value="ws">Samoa</SelectItem>
                      <SelectItem value="sm">San Marino</SelectItem>
                      <SelectItem value="st">São Tomé and Príncipe</SelectItem>
                      <SelectItem value="sa">Saudi Arabia</SelectItem>
                      <SelectItem value="sn">Senegal</SelectItem>
                      <SelectItem value="rs">Serbia</SelectItem>
                      <SelectItem value="sc">Seychelles</SelectItem>
                      <SelectItem value="sl">Sierra Leone</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="sk">Slovakia</SelectItem>
                      <SelectItem value="si">Slovenia</SelectItem>
                      <SelectItem value="sb">Solomon Islands</SelectItem>
                      <SelectItem value="so">Somalia</SelectItem>
                      <SelectItem value="za">South Africa</SelectItem>
                      <SelectItem value="ss">South Sudan</SelectItem>
                      <SelectItem value="es">Spain</SelectItem>
                      <SelectItem value="lk">Sri Lanka</SelectItem>
                      <SelectItem value="sd">Sudan</SelectItem>
                      <SelectItem value="sr">Suriname</SelectItem>
                      <SelectItem value="se">Sweden</SelectItem>
                      <SelectItem value="ch">Switzerland</SelectItem>
                      <SelectItem value="sy">Syria</SelectItem>
                      <SelectItem value="tw">Taiwan</SelectItem>
                      <SelectItem value="tj">Tajikistan</SelectItem>
                      <SelectItem value="tz">Tanzania</SelectItem>
                      <SelectItem value="th">Thailand</SelectItem>
                      <SelectItem value="tl">Timor-Leste</SelectItem>
                      <SelectItem value="tg">Togo</SelectItem>
                      <SelectItem value="to">Tonga</SelectItem>
                      <SelectItem value="tt">Trinidad and Tobago</SelectItem>
                      <SelectItem value="tn">Tunisia</SelectItem>
                      <SelectItem value="tr">Turkey</SelectItem>
                      <SelectItem value="tm">Turkmenistan</SelectItem>
                      <SelectItem value="tv">Tuvalu</SelectItem>
                      <SelectItem value="ug">Uganda</SelectItem>
                      <SelectItem value="ua">Ukraine</SelectItem>
                      <SelectItem value="ae">United Arab Emirates</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uy">Uruguay</SelectItem>
                      <SelectItem value="uz">Uzbekistan</SelectItem>
                      <SelectItem value="vu">Vanuatu</SelectItem>
                      <SelectItem value="va">Vatican City</SelectItem>
                      <SelectItem value="ve">Venezuela</SelectItem>
                      <SelectItem value="vn">Vietnam</SelectItem>
                      <SelectItem value="ye">Yemen</SelectItem>
                      <SelectItem value="zm">Zambia</SelectItem>
                      <SelectItem value="zw">Zimbabwe</SelectItem>
                    </SelectContent>

                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Visa Type" />
                    </SelectTrigger>
                  </FormControl>
                     <SelectContent>
                          <SelectItem value="tourist">Tourist Visa</SelectItem>
                          <SelectItem value="business">Business Visa</SelectItem>
                          <SelectItem value="student">Student Visa</SelectItem>
                          <SelectItem value="work">Work Visa</SelectItem>
                          <SelectItem value="transit">Transit Visa</SelectItem>
                          <SelectItem value="medical">Medical Visa</SelectItem>
                          <SelectItem value="journalist">Journalist Visa</SelectItem>
                          <SelectItem value="diplomatic">Diplomatic Visa</SelectItem>
                          <SelectItem value="religious">Religious Visa</SelectItem>
                          <SelectItem value="research">Research Visa</SelectItem>
                          <SelectItem value="spouse">Spouse/Family Visa</SelectItem>
                          <SelectItem value="immigrant">Immigrant Visa</SelectItem>
                          <SelectItem value="refugee">Refugee/Humanitarian Visa</SelectItem>
                          <SelectItem value="official">Official Government Visa</SelectItem>
                          <SelectItem value="working-holiday">Working Holiday Visa</SelectItem>
                        </SelectContent>

                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-purple-800 text-white hover:bg-purple-800"
          >
            <Search className="mr-2 h-4 w-4" />
            Proceed
          </Button>
        </div>
      </form>
    </Form>
  );
}
