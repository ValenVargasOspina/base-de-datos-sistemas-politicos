## DPI2020 Database of Political Institutions:

Changes and Variable Definitions

Cesi Cruz Philip Keefer Carlos Scartascini

Department of Research and Chief Economist

DATABASE/DATASET

IDB-DT-56

January 2021


## DPI2020 Database of Political Institutions:

## Changes and Variable Definitions

Cesi Cruz* Philip Keefer** Carlos Scartascini**

\* University of British Columbia ** Inter-American Development Bank

Inter-American Development Bank Department of Research and Chief Economist


## http://www.iadb.org

Copyright © 2021 Inter-American Development Bank. This work is licensed under a Creative Commons IGO 3.0 Attribution- NonCommercial-NoDerivatives (CC-IGO BY-NC-ND 3.0 IGO) license (http://creativecommons.org/licenses/by-nc- nd/3.0/igo/legalcode) and may be reproduced with attribution to the IDB and for any non-commercial purpose. No derivative work is allowed.

Any dispute related to the use of the works of the IDB that cannot be settled amicably shall be submitted to arbitration pursuant to the UNCITRAL rules. The use of the IDB’s name for any purpose other than for attribution, and the use of IDB’s logo shall be subject to a separate written license agreement between the IDB and the user and is not authorized as part of this CC-IGO license.

Note that link provided above includes additional terms and conditions of the license.

The results offered in this database/dataset are those compiled by the authors and do not necessarily reflect the views of the Inter-American Development Bank, its Board of Directors, or the countries they represent.


## Database of Political Institutions: Changes and Variable Definitions DPI2020

## University of British Columbia Cesi Cruz

## The Inter-American Development Bank Philip Keefer Carlos Scartascini

Issued: January 2021

When using the data, please cite:

Cruz, Cesi, Philip Keefer, and Carlos Scartascini. 2021. Database of Political Institutions 2020.

Washington, DC: Inter-American Development Bank Research Department.

Distributed by Washington, DC: Inter-American Development Bank Numbers for Development. [URL 🔗](http://dx.doi.org/10.18235/0003049)

[http://dx.doi.org/10.18235/0003049](http://dx.doi.org/10.18235/0003049)

DPI has been the product of tremendous effort by several research assistants. Charis Tolentino was responsible for coding DPI2015, DPI2017, and DPI2020. Cesi Cruz coded DPI2006, DPI2010, DPI2012. Ji-Young Yang, Thomas Kenyon, Abdoulaye Tall, Yee Wong, Alberto Groff and Patrick Walsh were responsible for coding different earlier versions of DPI. We are grateful to a team from UBC and the Centre for Innovative Data in Economics Research for additional research, coding, and outreach assistance: Claire Casher, Bronwyn Moore, Chad Rickaby, Maxime Rotsaert, and Daniel

Rojas Lozano.


## CHANGES FROM THE PREVIOUS VERSION OF DPI

DPI2020 extends DPI2017 through 2020, adding data for the years 2018, 2019 and 2020. [URL 🔗](https://publications.iadb.org/en/database-political-institutions-2017-dpi2017)

Corrections for this round cover 58 different countries and 59 different variables. All in all, 605 values were changed.

Major corrections include:

- 1. MULTPL variable. This variable is currently under review. Please note that the existing variable does not indicate if a reelected executive can be further reelected according to the constitution. In the next round we will provide this information.

- 2. Addition to the coding rules of the SYSTEM variable for assembly-elected presidential systems to better account for semi-presidential systems.

New Variables on the Executive

TERMLIMIT: Describes the existence of limitations for reelection.

REELECT: Describes if the elected executive can be reelected.

New gender quota variables

This round of updates also includes two new gender quota variables:

GQ indicates if there is a gender quota system to recruit women in political positions and specifies its type (i.e.: reserved seat or candidate list).

GQI indicates the year in which the gender quota was effectively implemented.


## Sources

Europa World Online. London, Routledge. http://www.europaworld.com/entry. [URL 🔗](http://www.europaworld.com/entry)

Political Handbook of the World 2010. Ed. Arthur S. Banks, Thomas C. Muller, and William R. Overstreet. Washington: CQ Press, 2017.

Political Handbook of the World Online Edition. http://library.cqpress.com.

Parline Database. Inter-Parliamentary Union. http://www.ipu.org/parline-e/parlinesearch.asp. [URL 🔗](http://www.ipu.org/parline-e/parlinesearch.asp)

IFES Election Guide. International Foundation for Electoral Systems. http://www.electionguide.org/. [URL 🔗](http://www.electionguide.org/)

## Variable definitions – DPI 2020

General remarks:

Examples are printed in italics

Data refer to January 1 of each year

House refers to the lower House. Examples: House of Representatives, House of Commons, Bundestag.

Senate refers to the Upper House, where it exists and where it has some power (defined below). Examples: Senate, House of Lords, Bundesrat.

For some of the following questions, we will refer to the following example: US President Clinton: elected in November 92, took power in January 93, elected until January 2001.

For variables that have binary values, “1” is equivalent to “yes,” while “0” is equivalent to “no.”

Note: With a few exceptions (noted below) the event where no information was available the cells were left blank whereas in the case where the information was not applicable cells were marked with “NA” or “- 999” for numeric variables.

NA is recorded in the following cases: when a country is a colony, even if it has internal self-government within a commonwealth; for the Soviet Republics while they were part of the USSR; for countries in the midst of civil war or political crisis.

Every attempt was made to use party name acronyms that seemed most widely recognized (PRI in Mexico, SPD in Germany, etc.); however, there are many cases in which party acronyms reflect the English name of the party, and many others reflecting the name in the respective language. A master list of party names and acronyms used in this update is included. This master list also includes party names from previous versions that were changed for consistency in this update.

## Chief Executive Variables

## SYSTEM Parliamentary (2), Assembly-elected President (1), Presidential (0)

Systems with unelected executives (those scoring a 2 or 3 on the Executive Index of Political Competitiveness – to be defined below) get a 0. Systems with presidents who are elected directly or by an electoral college (whose only function is to elect the president), in cases where there is no prime minister, also receive a 0. In


systems with both a prime minister and a president, we consider the following factors to categorize the system:

- a) Veto power: president can veto legislation and the parliament needs a supermajority to override the veto.

- b) Appoint prime minister: president can appoint and dismiss prime minister and/or other ministers.

- c) Dissolve parliament: president can dissolve parliament and call for new elections.

d) Mentioning in sources: If the sources mention the president more often than the PM then this serves as an additional indicator to call the system presidential (Romania, Kyrgyzstan, Estonia, Yugoslavia).

The system is presidential if (a) is true, or if (b) and (c) are true. If no information or ambiguous information on (a), (b), (c), then (d). Consult Appendix for specific country examples.

Countries in which the legislature elects the chief executive are parliamentary (2), with the following exception: if that assembly or group cannot easily recall him (if they need a 2/3 vote to impeach, or must dissolve themselves while forcing him out) then the system gets a 1.

Systems are assembly-elected presidential if the president cannot be easily removed and if the president fulfills the criteria for presidential systems in places with both prime ministers and directly elected presidents.

## YRSOFFC

## How many years has the chief executive been in office?

Some decision rule is needed to deal with partial years. We use the following: years are counted in which the executive was in power as of January 1 or was elected but had not taken office as of January 1. Thus, a “1” is recorded in the year following his/her election. Example: Bush was president as of January 1, 1992, so, although he lost the election in November 1992, this variable is recorded as a 4 in 1992, marking Bush’s fourth year in office. Although Clinton was elected in November of 1992 and took office in January 1993, since he was president-elect on January 1 1993, this variable is recorded as “1” for 1993.

If a country made a transition from colony to independence, we date a chief executive’s tenure to the start of independence, not the granting of internal self-government (e.g., Timor-Leste for 2003). Republics of the Soviet Union do not fall into this category; they are tracked from full independence.

The executive who formally (de jure) holds power is counted. However, the executive must actually be in the country to be counted. If an executive is deposed by a coup and returns to power within the same calendar year, the coup is counted as “failed” and the executive’s rule is considered unbroken. On the other hand, if a parliamentary government resigns and then is re-appointed, this is counted as a new government. See Appendix for examples of ambiguous cases.

In the case of Communist nations, we track the general secretary of the Communist party, regardless of who is president/premier. See Appendix for ambiguous cases.

## FINITTRM

## Is there a finite term in office? (1 if yes, O if no)

Is there a constitutional limit on the number of years the executive can serve before new elections must be called? Deviating from the convention, a 0 is recorded if a limit is not explicitly stated. This gets a 0 in the cases where the constitution with year limits is suspended or unenforced.


## YRCURNT

Years left in current term

Only full years are counted. Thus, a “0” is scored in an election year, and n-1 in the year after an election, where n is the length of the term.

## MULTPL

If there are formal restraints on an executive’s term (NA if not), can s/he serve additional term(s) following the current one?

If the executive’s term is constitutionally limited (NA if not), can s/he be reelected? The word “additional” is new in 2004, but reflects only an effort to improve clarity, not a change coding rules. Deviating from the convention, a 1 is recorded if a term limit is not explicitly stated. Only limits on immediate reelection count. Prime ministers always get “1.” (If FINITRM=0, then MULTIPL=NA.)

## MILITARY

Is Chief Executive a military officer?

“1” if the source (Europa or Banks) includes a rank in their title, 0 otherwise. If chief executives were described as officers with no indication of formal retirement when they assumed office, they are always listed as officers for the duration of their term. If chief executives were formally retired military officers upon taking office, then this variable gets a 0.

## DEFMIN

Is defense minister a military officer?

Same as in MILITARY. If no one in the cabinet with such responsibility, or if there are no armed forces, then “NA”. If there is no defense minister but the chief executive controls military directly, then same answer as in MILITARY.

## PERCENT1

President got what % of votes in the 1st/only round?

NA if SYSTEM gets a 1 or 2, and in the case of those with a 2 in Executive Index of Electoral Competition (see below for EIEC definition). If there is a prime minister who is considered the chief executive, but there is a president with some powers (e.g., France) then we still record the president’s vote %. If not an election year, records most recent election. If a vice president is completing a president’s term in office, he gets the same score as the former president. If a president is prevented from taking office and later returns without an election (but within the limits of his original term) he gets the same score as his original election.

## PERCENTL

President got what % of votes in the final round?

NA for reasons above, or if no runoff. If not an election year, records most recent election.

## PRTYIN

Party of chief executive has been how long in office

Same rules as YRSOFFC. NA if there are no parties, if the chief executive is an independent, or if the “party” is the army. In general, the counting restarts from 1 for a party if its name changes. However, in a few cases the sources indicated that party leadership, membership, and platform remained the same following the name change. In these cases, the name change was recorded but the year count did not restart. All of these cases are noted in the database.


## EXECME

Name of party, if any

“Independent” if the chief executive is independent, a monarch, in the military, or if there are no parties.

## EXECRLC

Right (1); Left (3); Center (2); No information (0); No executive (NA)

Party orientation with respect to economic policy, coded based on the description of the party in the sources, using the following criteria:

Right: for parties that are defined as conservative, Christian democratic, or right-wing.

Left: for parties that are defined as communist, socialist, social democratic, or left-wing.

Center: for parties that are defined as centrist or when a party’s position can best be described as centrist (e.g., party advocates strengthening private enterprise in a social-liberal context). Not described as centrist if competing factions “average out” to a centrist position (e.g., a party of “right- wing Muslims and Beijing-oriented Marxists”).

0: for all those cases which do not fit into the above-mentioned category (i.e., party’s platform does not focus on economic issues, or there are competing wings), or no information.

NA: for those cases in which there is no executive.

For ease of use, the variables are labeled R, L, C in the STATA version of the dataset, where R=1, L=3, and C=2.

2) If the orientation of a party was not immediately obvious from its name or description in the handbooks, we consulted the website: http://www.agora.stm.it/elections/parties.htm. This site provides one-word descriptions of party orientation which could be fit into the above framework. Cross-checks on parties listed in both sources showed a high degree of agreement. As this source provided no historical information, we assumed that party location on the left-right spectrum remained unchanged over time, and we recorded this party orientation for all years. Agora was used only occasionally before 2006, and it was not used after the 2006 updates. Since the 2006 updates, the information in the Political Handbook has been sufficient to code party orientation.

Terms on the website such as “liberal,” “progressive,” “authoritarian” or “xenophobic” were dealt with in the following way: For “liberal” we went with the European definition (right), since the website is based in Europe. We classified “progressive,” “authoritarian,” “xenophobic” as “0” (none of the above) unless we had additional information that allowed us to position the party on the left- right spectrum (see 2).

3) We further spot-checked party orientations with Political Parties of Africa and the Middle East and Political Parties of Eastern Europe and the Successor States, both published by the Longman Current Affairs series. If there was a conflict among these sources, we went with the description of the party economic platform (from any source).

4) If there was evidence that the executive deviated considerably from the party orientation (e.g., austerity policy of a socialist / social democratic party) the executive’s orientation is recorded in the database, not the party’s. In addition, if executive is independent, the executive’s orientation is recorded.

5) Finally, we compared our codings with those of Inglehart and Huber (1995). The coincidence of codings was high, but there were some discrepancies between theirs (based on party platforms)


and ours (determined as stated above). In the vast majority of cases with overlaps, our codings were the same. When the codings differed, we revisited our sources. In most of those cases, we found no reason to change our codings. In some cases, though, we did. Those changes are listed in the table.

| Country | Party Before | DPI 2000 | After DPI 2000 | Reason for change |
| --- | --- | --- | --- | --- |
| Brazil | PDS PSDB | L R | R L | PHW indicates the presence of many right-wing members of the former MDB Our sources indicate this is a center-left party |
| Denmark RV |   | L | C | Advocates “social reforms without socialism;” “private enterprise in a socio-liberal context” (Europa) |
|   | Estonia ECP R |   | C | similar to “west European socialists in 1970s” (EIU) |
| Iceland | PP | R | C | “center-left” (Political Almanac); program based on “social liberalism and cooperation” (Europa) |
| Ireland | FF | R | C | Sources indicate that the party supports the idea of “maximum sustainable employment based on fostering a spirit of enterprise and self-reliance on social partnership.” |
| México | PRI | L | L (1975- 82) C (1983- 2000) | Sources indicate that the party was leftist under López Portillo, then centrist following 1982 debt crisis under de la Madrid. |
| Poland UD | ZCH- N | R L | C R | Policies characterized by “economic pragmatism” (LOC) “ideologically conservative”/“anti-communist” (PHW) |
| Portugal PSD |   | L | C | Nominally social democratic, but aims to “promote market economics, taking into account the welfare of the community” (PHW) |
|   | Slovakia HZDS L |   | 0 | “populist” but ill-defined economic program |

## EXECNAT

## Nationalist (1 if yes)

“1” if:

1) Party is listed as nationalist in Europa, Banks, Political Handbook, or www.agora;

2) A primary component of the party’s platform is the creation or defense of a national or ethnic identity. Examples: parties that have fought for independence, either militarily or politically, from a colonial power; advocates persecution of minorities; is listed as “xenophobic” on the Agora website.

## 0 otherwise (deviating from convention)

In cases where executive is independent, the executive’s personal orientation is recorded. NA if no executive

For ease of use, the variables are labeled in the STATA version of the dataset, where CH=1, CA=2, IS=3, HD=4, BD=5, and JW=6.


## EXECRURL Rural (1 if yes)

If our sources list rural issues as a key component of the party’s platform, or if farmers are a key party constituency, this variable is coded as “1.” Deviating from convention, 0 unless explicitly stated.

In cases where executive is independent, the executive’s personal orientation is recorded.

NA if no executive

## EXECREG Regional (1 if yes)

If our sources list regional issues as a key component of the party’s platform, or if a specific region or regions are a key party constituency, this variable is coded as “1.” Deviating from convention, 0 unless explicitly

stated.

In cases where executive is independent, the executive’s personal orientation is recorded.

NA if no executive

## EXECREL Religious (1:Christian, 2: Catholic, 3: Islamic, 4: Hindu, 5: Buddhist, 6: Jewish, 0: otherwise)

- All parties that are called Christian-Democratic by one of our sources are listed as 
Christian.

- Islamic
 only recorded if:

- 1) The chief executive is also a religious leader, and

- 2) That religion is Islam.

- In all other cases, platform and constituency are main indicators.

- Otherwise, 0, deviating from convention of 
blank.

In cases where executive is independent, the executive’s personal orientation is recorded.

NA if no executive

## EXECAGE Time since formation under this name

NA if executive is not affiliated with a party. We record party age from the first year that the party was founded under its current name (which can be before a country achieves independence). For parties undergoing a name change or emerging from existing parties, the subsequent party is considered a new party except in the cases where the sources report that the change was superficial. We define a name change as “superficial” if the party leaders, platform, and constituency remained the same. In nearly all cases of a name change, the sources explicitly identify substantive differences in the new party compared to the old, ranging from a change in leadership to change in program. Mergers with other parties are not counted as changes unless name is changed. If several parties come together to form an alliance under a new name, this is counted as a new party.

## ALLHOUSE Does party of executive control all relevant houses?

Does the party of the executive have an absolute majority in the houses that have lawmaking powers? The case of an appointed Senate is considered as controlled by the executive. A senate made up along the lines of ethnic or tribal representation is not controlled by the executive, as these groups nominate their own representatives.


## NONCHIEF

In systems with both non-ceremonial PM and President, what is the party affiliation of the one not called Chief Executive?

For parliamentary systems (2 in SYSTEM) with non-ceremonial president: what is the party affiliation of the president? NA if the president is ceremonial or non-existent, or if SYSTEM has a score of 1 or 0.

## TERMLIMIT (of chief executive)

Does the chief executive have limitations to their ability of being reelected?

- 1 specific provision allowing for unlimited re-election No limitation at all, either in the absence of any provision to the contrary or with a

- 2 3 4 5 Limitation through fixed number (two) of possible consecutive terms

- Limitation through fixed number (two) of possible terms

- Absolute ban on re-election

- 6* Limitation through fixed number (three) of possible consecutive terms

- 7* Re-election possible after sitting out two consecutive terms

- 8* Limitation on consecutive terms (with fixed number = 2)

- \* there is only one country under this category.

- Limitation on consecutive terms (with no maximum number)

## REELECT

Can the chief executive be re-elected? (this variable is adapted from MULTPL variable definition/description)

- executive can be re-elected after sitting out one term; if category = 7, 1 means the executive can be re-elected after sitting out two terms) 0 1 if the executive can be re-elected; (if TERMLIMIT category = 2 or 8, 1 means the

- if the executive is in his last term or cannot be re-elected

## Party Variables in the Legislature

- Name, orientation, rural, regional, religious, and date of formation information is recorded as for the executive’s party for the 3 largest government parties and the largest opposition party. Groups that are appointed to the legislature are treated as parties named “Appointees.”

- In the case where seats of some parties are unknown, we fill up the 1st largest, 2nd largest, etc. columns with parties whose seats are known, and then fill in the rest with parties whose seats are unknown in arbitrary order.

- In the case of 
Fronts,
 where several parties join together under an umbrella party, if any of the following is true, the front is disregarded and the parties are counted individually:

- 1) The parties in the front compete for seats

- 2) Two or more parties within the front put forward their own presidential candidates

- 3) Our sources indicate that cabinet positions have been distributed among members of the different parties forming the front.


- If none of these is true, the front is recorded as a single party. Exception: if these criteria lead us to conclude that the parties are separate, but our sources only list seats for the front, we record the front as one party. In case of ambiguities, the front is considered to be one party and the irregularity is noted. If the constituent parties of a front share the same orientation, that orientation is reported for the front. If their orientations differ, then we record the orientation specified in the sources. Parties that are created by the government but are allowed to compete for seats in a legislature that has legislative power are recorded as legitimate parties.

- Parties that are created by the government but the legislature does not have legislative power are recorded as independent rather than “pro-government” parties. This convention has little material impact on any variables that depend on parties in government (such as Checks or Polarization) because these variables are set to 1 or 0, respectively, in countries with non-effective legislatures.

- Independents are counted as individual parties with one seat each.

- In the case of presidential systems (0 or 1 in SYSTEM), the party of the president goes in the -Largest Govt. Party” column, regardless of whether there is another, larger party. Other parties with one of the following characteristics are also listed as government parties and ranked by seats: 1) they are listed in our sources as in the government or represented in the cabinet; 2) are supportive of the president on substantial issues, or 3) take seats in the legislature but do not run a candidate for the presidency. The parties who oppose the presidential platform (as indicated in the sources) or who run candidates for the presidency, are listed in the opposition.

- In the case of parliamentary systems, all parties that are not in the government are classified as opposition.

- In the case where parties are split into 
wings
 based on language or ethnic divisions (e.g., Belgium), we classify wings as separate or unified based on how our sources report the seats in the legislature. If the seats are broken down by wing, we classify them as separate parties; if seats are only reported for the overall party, we classify it as one party.

## TOTALSEATS Total Seats in the Legislature

Total seats in the legislature, or in the case of bicameral legislatures, the total seats in the lower house. This variable includes appointed and elected seats and is calculated two ways: 1) in most cases it is calculated by adding the values for all the seat share variables (gov1seat, gov2seat, gov3seat, opp1seat, opp2seat, opp3seat, govothst, oppothst, numul); 2) it is entered by hand in cases where the seat share of some parties is not specified in the sources. Total seats is NA (-999) when there is no legislature or when the legislature had been dissolved.

## HERFGOV Herfindahl Index Government

The sum of the squared seat shares of all parties in the government. Equals NA if there is no parliament. If there are any government parties where seats are unknown (cell is blank), the Herfindahl is also blank. No parties in the legislature (0 in 1GOVSEAT) results in a NA in the Herfindahl. In the case of “other” parties, Herfindahl divides the number of “other” seats by the number of “other” parties and uses this average for the size of the “other” parties. Independents are calculated as if they were individual parties with one seat each.

## GOVFRAC

The probability that two deputies picked at random from among the government parties will be of different parties. Equals NA if there is no parliament. If there are any government parties where seats are unknown


(cell is blank), GOVFRAC is also blank. No parties in the legislature (0 in 1GOVSEAT) results in NA, just as in the Herfindahl.

## NUMGOV

\# of Govt. Seats

Records the total number of seats held by all government parties. See below for classification of parties into government and opposition. Because other variables are generated by formulas that reference this cell, a real number must always be reported.

## NUMVOTE

Vote share of Government Parties

Records the total vote share of all government parties. See below for classification of parties into government and opposition. Because other variables are generated by formulas that reference this cell, a real number must always be reported.

## LARGEST GOVT PARTY

GOV1ME Name

GOV1SEAT Seats

GOV1VOTE Vote Share

GOV1RLC R, L, C, 0, or NA

GOV1NAT Nationalist

GOV1RURL Rural

GOV1REG Regional

GOV1REL Religious

GOV1AGE Time since formation

## 2nd GOVT. PARTY

GOV2ME Name

GOV2SEAT Seats

GOV2VOTE Vote Share

GOV2RLC R, L, C, 0, or NA

GOV2NAT Nationalist

GOV2RURL Rural

GOV2REG Regional

GOV2REL Religious

GOV2AGE Time since formation

## 3rd GOVT. PARTY

GOV3ME Name

GOV3SEAT Seats

GOV3VOTE Vote Share

GOV3RLC R, L, C, 0, or NA

GOV3NAT Nationalist

GOV3RURL Rural

GOV3REG Regional

- GOV3REL Religious

GOV3AGE Time since formation

## Other GOVT. PARTIES

GOVOTH Number of Parties

GOVOTHST Total Seats

GOVOTHVT Total Vote Share


## HERFOPP Herfindahl Index Opp.

Calculated in the same manner as the Herfindahl Government. Equals NA if there is no parliament. If there are any opposition parties where seats are unknown (cell is blank), the Herfindahl is also blank. No parties in the legislature (0 in 1OPPSEAT) results in NA in the Herfindahl

## OPPFRAC

The probability that two deputies picked at random from among the opposition parties will be of different parties. Equals NA if there is no parliament. If there are any opposition parties where seats are unknown (cell is blank), OPPFRAC is also blank. No parties in the legislature (0 in 1GOVSEAT) results in NA, just as in the Herfindahl.

## NUMOPP Number of opposition seats

Records the total number of seats held by all opposition parties. Because other variables are generated by formulas that reference this cell, a real number must always be reported.

OPPVOTE Vote Share of Opposition Parties

Records the total vote share of all opposition parties. Because other variables are generated by formulas that reference this cell, a real number must always be reported.

LARGEST OPP. PARTY

OPP1ME Name

OPP1SEAT Seats

OPP1VOTE Vote Share

OPP1RLC R, L, C, 0, or NA

OPP1NAT Nationalist

OPP1RURL Rural

OPP1REG Regional

OPP1REL Religious

OPP1AGE Time since formation

## 2nd OPP. PARTY

OPP2ME Name

OPP2SEAT Seats

OPP2VOTE Vote Share

## 3rd OPP. PARTY

OPP3ME Name

OPP3SEAT Seats

OPP3VOTE Vote Share

## Other Opposition Parties

OPPOTH Number of Parties

OPPOTHST Total Seats

OPPOTHVT Total Vote Share

## House non-aligned or independent

ULPRTY Number of parties

NUMUL Seats

ULVOTE Vote Share


These columns are for parties or legislators that are specifically reported as independent or non-aligned in our sources only. If the allegiance of the party or legislators is unknown or not indicated in our sources, their seat shares are not recorded in any of these columns but included in the total number of seats (TOTALSEATS). In those cases, the number of legislators whose allegiance is unknown can be calculated by subtracting NUMGOV, NUMOPP, and NUMUL from the TOTALSEATS variable. In the case of elections with no parties but sources report the allegiance of the legislators, we put the number of seats in either GOV1SEAT or OPP1SEAT, with “independents” as the party name unless the sources report a name for the group. If this applies to multiple non-party groupings, the seat shares of the largest grouping are recorded in either GOV1SEAT or OPP1SEAT, and the rest are recorded in the appropriate government or opposition columns for the second largest, third largest, and other parties. Appointees are entered as a government party (with “Appointees” as the party name), on the assumption that they support the government.

## HERFTOT Herfindahl Index - Total

Calculated in the same manner as the Herfindahl Government and Herfindahl Opposition: it is NA if there is no parliament or if there are no parties in the legislature and blank if any government or opposition party seats are blank.

## FRAC

The probability that two deputies picked at random from the legislature will be of different parties. It is NA or blank under the same circumstances as HERFTOT.

## OPPMAJH

Does one opposition party have an absolute majority in House?

NA if no House

OPPMAJS

Senate: Does one opposition party have absolute majority in Senate?

NA if no Senate, or if Senate is neither appointed nor based on parties (based instead on tribal chiefs, professional representatives, etc.).

## DATELEG DATEEXEC Month when presidential/parliamentary elections were held.

The numbers 1 to 12 denote the months from January to December when the election was held. 13 is marked if the month was not known. In the case of multiple elections during a year, we record the election immediately prior to the installment of a candidate in office. Thus runoffs are counted, but their prior elections are not. In cases where candidates take office after each of multiple elections, we record the month of the first round of elections that year.

## MAJ Margin of Majority

This is the fraction of seats held by the government. It is calculated by dividing the number of government seats (NUMGOV) by total (government plus opposition plus non-aligned) seats.

PARTYAGE Average Age of Parties


This is the average of the ages of the 1st government party (1GOVAGE), 2nd government party

(2GOVAGE), and 1st opposition party (1OPPAGE), or the subset of these for which age of party is known.

## LEGELEC

“1” if there was a legislative election in this year.

## EXELEC

“1” if there was an executive election in this year.

## Electoral Rules

Legislative and Executive Indices of Electoral Competitiveness

(criteria modified from the scale created by Ferree and Singh, 1999)

LIEC Legislative IEC

Scale:

5

6

- In the case of 
Front
 parties (as in many Communist nations), the same criteria as in the legislature are used to separate single from multiple parties.

- Voting irregularities are picked up elsewhere and are ignored here.

- If an elected legislature exists but parties are banned (i.e., a legislature made up of independents), the legislature gets a 4.

- legislatures (i.e., system gets a 1 if there are no other assemblies). Constituent assemblies, if convened for the sole purpose of drafting a constitution, are not counted as

- Appointed advisory councils (frequently used in the Middle East and North Africa) are given a 2, but only if they have legislative power.

- recorded. If it is unclear whether there is competition among elected legislators in a single-party system, a 
3.5
 is

- If multiple parties won seats but it is unclear how many the largest party got, a 
6.5
 is recorded.

- If it is not clear whether multiple parties ran and only one party won or multiple parties ran and won more than 75% of the seats, a “5.5” is recorded.

No legislature: Unelected legislature: Elected, 1 candidate: 1 party, multiple candidates: multiple parties are legal but only one party won seats: multiple parties DID win seats but the largest party received more than 75% of the seats:

largest party got less than 75%: 7

1 2 3 4


- Assemblies that are elected with indefinite (or life-long) terms are scored based on their competitiveness, then marked down by one.

- Assemblies that are elected by other groups are scored based on the competitiveness of those groups.

- If an assembly is partly elected and party appointed, we score based on how the majority is decided.

- Assemblies operating under conditions of civil war or where there are power struggles within a country, with the result that its institutions do not control most of the territory or the most important parts of the territory, are scored as 1. This is irrespective of how competitively the assembly has been elected and its formal powers.

- Even if the right to vote or the right to run for office is restricted to a small sub-group of the population, we still score according to the normal system and make a note.

EIEC Executive IEC

- Uses same scale as Legislative IEC.

- Executives who are:

- 1) Elected directly by population, or

- 2) Elected by an electoral college that is elected by the people and has the sole purpose of electing the executive, are scored on the above scale.

- Executives elected by bodies other than these are given the same score that the electing body would get. Even if the electing body is not the actual “legislature” that is tracked in the LIEC (such as an appointed electoral college), the competitiveness of that body is used to score the executive.

- This means that competitively elected prime ministers get 6 or 7. The chief executives of Communist nations (the chairman of the Communist Party) are given a 3, because they are elected by the Party Congress, electing bodies which they do not appoint. Executives elected by small, appointed juntas or by appointed electoral colleges get 2.

- Rival chief executives in one country, particularly in the setting of armed conflicts, are counted as No executives, and thus score a 1.

- Referenda and votes by 
popular acclamation
 on unelected executives are scored as 3.

- If executives unilaterally extend their terms of office, they get a 2 starting in the year they should have held elections. Any executive elected for life, even by the people or an elected assembly, gets a 2. This elected-for-life rule is slightly different from that followed for legislatures that unilaterally extend their rule.

- If chief executive takes office through a coup and remains in office without an election, EIEC is 2 because the executive is unelected.

- If an elected president is impeached and the vice-president succeeds the presidency in a legal and proper way, EIEC remains as was. If EIEC was 7 under the old president, it remains 7 under the new president.

For “Electoral Rules” variables: all get an NA if the LIEC is 1. If LIEC is 2, then legislature is unelected and we infer that district magnitude is NA. If LIEC is less than or equal to 4, then PR is also NA irrespective of district magnitude. If LIEC is less than or equal to 3.5, then both PR and Plurality are NA.

In order to assess electoral rules, we use the IPU website as well as the Europa Yearbook (and to a lesser extent Banks). IPU has the most recent information whereas Europa has information up to 1984, and from


1990 to 1994. If there are discrepancies between Europa (to 1984) and IPU (1998), we assume that changes have occurred, and only input the IPU information for 1995, leaving blanks from 1985 to 1994. If the IPU matched the Europa exactly, we assumed no changes took place, and filled in the intervening years. In the event that a system changed and then switched back, this introduces errors. Since this assumption was made only when institutions from 1984 matched those in 1998, these cases are limited to very stable democracies.

## MDMH MDMS

## Mean District Magnitude (MDM), House and Senate

The weighted average of the number of representatives elected by each constituency size, if available. If not, we use the number of seats divided by the number of constituencies (if both are known). If the constituencies are the provincial or state divisions, we use the number of states or provinces to make this calculation for as long as we know this number and the number of seats. If the only information we have on the number of constituencies comes from the Inter Parliamentary Union (IPU), and the constituencies are not the states/provinces, then we use IPU’s number to calculate the Mean District Magnitude for 1995 and leave all unknowns blank.

If we have no positive data on district magnitude, we extrapolate backwards from the last year that we do have positive data until we run into a constitutional overhaul or an electoral law change that is either a) mentioned in both sources or b) explicitly says that MDMH changed, but does not tell us how it changed. If there is no information about district magnitude, MDMH is coded blank. MDMH is NA where there is no legislature and, if legislature is appointed or members are described as indirectly elected, district magnitude is coded as Indirect.

Information about constitutional and electoral law changes were obtained through Europa and Political Handbook yearbooks, as well as online sources (ACE Project, 1upinfo.com, IPU Parline).

## SSH

## Number of senate/ (number of house + number of senate)

Senate gets an NA if no Senate or if Senate is made up of appointees, tribal chiefs, dignitaries, members of professional organizations or lower house members. Districts that are organized by race (Zimbabwe) are blank.

## PLURALITY

## Plurality? (1 if yes, O if no)

In “plurality” systems, legislators are elected using a winner-take-all / first past the post rule. “1” if this system is used, 0 if it is not. “1” if there is competition for the seats in a one-party state (LIEC is 4), blank if it is unclear whether there is competition for seats in a one-party state (LIEC is 3.5) and “NA” if there is no competition for seats in a one-party state or if legislators are appointed (LIEC is 3 or lower).

PR

Proportional Representation? (1 if yes, 0 if no)

“1” if candidates are elected based on the percent of votes received by their party and/or if our sources specifically call the system “proportional representation.” “0” otherwise, except if LIEC is 4 or lower, when “NA” is reported.

## HOUSESYS

## Which electoral rule (proportional representation or plurality) governs the election of the majority of House seats?

This is coded 1 if most seats are Plurality, zero if most seats are Proportional. In cases where the majority of legislators are appointed or indirectly elected, HOUSESYS is coded Indirect.


SENSYS

If Plurality and Proportional Representation which governs the majority/all of the Senate seats?

This is coded 1 if most seats are Plurality, zero if most seats are Proportional.

THRESH

What is the vote threshold for representation?

Records the minimum vote share that a party must obtain in order to take at least one seat in PR systems. If there are more than one threshold, record the one that governs the most seats. No information from sources results in a 0.

DHONDT

Is the D’Hondt system used? (1 if yes, 0 if no)

Is the D’Hondt rule used to allocate seats in a PR system? NA if PR is 0 or NA. If PR is 1, and information is only available from IPU, just record data in 1995.

CL

Are closed lists used? (1 if yes, O if no)

When PR is “1”, closed list gets a “1” if voters cannot express preferences for candidates within a party list, 0 if voters can.

If PR is “NA” or 0, and Mean District Magnitude =1, Closed list is NA. If PR is “NA” or 0 and Mean District Magnitude is greater than one, the following rules apply:

- 1) If only one party takes seats, closed list is:

“0” (open list), if the number of candidates is greater than the number of seats in an electoral district in a one-party state where other parties may or may not be illegal (LIEC is 4 or 5), “1”

(closed list), if the number of candidates equals the number of seats in an electoral district in a one-party state where other parties are illegal (LIEC is 3), blank, if it is unclear whether there is more than one candidate for every seat in an electoral district in a one-party state where other parties are illegal (LIEC is 3.5).

- 2) If there are multiple parties taking seats, closed list is blank unless the system is explicitly stated as open or closed.

SELECT

Candidate selection

- 1: National (by national executive, party leader, interest groups or party factions)

- 2: Sub-national (by subset of constituency party members, e.g., in conventions)

- 3: Primary (including party primary and primaries using all the votes of a constituency)

Blank if no information.

GQ

Gender quota

This variable indicates the presence of legally or constitutionally mandated quotas (in the case of reserved seats and candidate list requirements) or voluntary quotas instituted by individual political parties (voluntary quotas).


This variable takes the value of “0” when no quotas are in place, “1” when the quotas are defined as a reserved seat in the legislature, “2” when quotas are required in candidate lists or party slates, and “3” when any party has a voluntary quota, and “-999” when there is no information available.

For countries with a voluntary party quota, a “3” is assigned since the year the first party voluntarily implemented the quota.

## GQI Gender quota implementation

This variable indicates the year in which the gender quota policy was effectively implemented. It is “1” since the year the quota was implemented, “0” when the quota has not been implemented, and “-999” when there no information available.

## FRAUD Were vote fraud or candidate intimidation serious enough to affect the outcome of elections?

This variable captures extra-constitutional irregularities, which are recorded only if mentioned in sources. 0 is reported for countries where, for example, opposition parties are officially and constitutionally banned or where irregularities are not mentioned (although may still exist); “1” when opposition is officially legal but suppressed anyway. If not an election year, or if elected government has been deposed, refers to most recent election (i.e., the only way to get rid of a “1” is to hold a fair election). Recording is irrespective of whether only opposition claims that fraudulent elections have occurred or whether allegations are backed by independent international observers. Recorded also are any forms of boycotts carried out by important parties before or after parliamentary elections. In the cases where irregularities are mentioned in the text of the sources, they were recorded. However, there may have been instances of fraud/violence that were not reported, thus resulting in false negatives.

## Stability and Checks and Balances

Longest tenure of a veto player

Measures the tenure of the veto player with the longest tenure. If LIEC is less than 5 (6 for TENLONG_STRICT), then only the chief executive’s years in office are counted. Otherwise, in presidential systems, veto players are defined as the president and the largest party in the legislature. In parliamentary systems, the veto players are defined as the PM and the three largest government parties.

TENSHORT TENSHORT_STRICT

Shortest tenure of a veto player

Measures the tenure of the veto player with the shortest tenure. If LIEC is less than 5 (6 for TENSHORT_STRICT), then only the chief executive’s years in office are counted. In presidential systems, veto players are defined as the president and the largest party in the legislature. The shorter tenure between these two is taken as the value of this variable. In parliamentary systems, the veto players are defined as the PM and the three largest government parties.

TENSYS

How long has the country been autocratic or democratic, respectively?

TENLONG TENLONG_STRICT


If EIEC is below 6, the country is deemed autocratic or a country in which democratic institutions are not consolidated and leadership is personality-based. In this case, the system is as old as the executive’s years in office (YRSOFFC). If EIEC is 6 or 7, then TENSYS records how long this has been the case. For cases where this was the case prior to 1975, the value for 1975 is taken from Clague et al. (1996), “Property and Contract Rights under Democracy and Dictatorship,” The Journal of Economic Growth 1:2, 243-276 (June). They, for example, account for time since independence. This value then increases by one for each subsequent year that EIEC remains 6 or 7. Where Clague et al. provide no information (e.g., for The Bahamas), country profiles from the Economist Intelligence Unit were used to establish dates of independence and first-year values for TENSYS.

## CHECKS CHECKS_LAX Checks and balances

CHECKS equals one if LIEC OR EIEC is less than 6 (5 for CHECKS_LAX) – countries where legislatures are not competitively elected are considered countries where only the executive wields a check.

In countries where LIEC and EIEC are greater than or equal to 6 (5 for CHECKS_LAX):

CHECKS is incremented by one if there is a chief executive (it is blank or NA if not).

CHECKS is incremented by one if the chief executive is competitively elected (EIEC greater than six; this is the main difference from the deleted CHECKS2a, which increased by one when EIEC was greater than four).

CHECKS is incremented by one if the opposition controls the legislature.

In presidential systems, the value of CHECKS increases by one:

for each chamber of the legislature UNLESS the president’s party has a majority in the lower house AND a closed list system is in effect (implying stronger presidential control of his/her party, and therefore of the legislature).

for each party coded as allied with the president’s party and which has an ideological (left-right-center) orientation closer to that of the main opposition party than to that of the president’s party.

In parliamentary systems, the value of CHECKS increases by one

for every party in the government coalition as long as the parties are needed to maintain a majority (the previous version of CHECKS – Checks3 in DPI3 – increased by one for each of the three largest parties in the government coalition, regardless of whether they were needed for a legislative majority).

for every party in the government coalition that has a position on economic issues (right-left-center) closer to the largest opposition party than to the party of the executive.

In parliamentary systems, the prime minister’s party is not counted as a check if there is a closed rule in place – the prime minister is presumed in this case to control the party fully.

In a few situations, countries had competitively elected executives (EIEC=6 or 7), but NUMGOV or NUMOPP were zero, we do not know how to code these countries, so CHECKS was set to missing (e.g., Cambodia 1994~1998, Russia 1992, 1993).

*POLARIZ POLARIZ_STRICT Maximum polarization between the executive party and the four principle parties of the legislature*


POLARIZ is zero if LIEC or EIEC are less than 5 (elections are not competitive). POLARIZ_STRICT is zero if LIEC or EIEC is less than 6.

POLARIZ is zero if the chief executive’s party has an absolute majority in the legislature.

Otherwise:

POLARIZ is the maximum difference between the chief executive’s party’s value (EXECRLC) and the values of the three largest government parties and the largest opposition party.

## STABILITY

STABS STABS_STRICT

These variables count the percent of veto players who drop from the government in any given year. Veto players are defined as in CHECKS.

If LIEC is less than 5 (6 for STABS_STRICT) in year t-1, then it is assumed that the only veto player in year t-1 is the executive. STABS in year t is 1 if chief executive changes in year t, 0 otherwise.

If LIEC is 5 or greater (6 or greater for STABS_STRICT):

In presidential systems, if the president does not control the legislature (via closed list and a majority), then veto players are the president, and each chamber. If presidents gain control of the legislature at time t, then the chambers are counted as no longer being veto players. Similarly, if the president changes. If the largest opposition party has a majority in the legislature at time t-1 but not in time t, a change in veto players is again recorded. If the largest government party has a majority in the legislature (and there is no closed list) at time t-1 but not at time t, a change in veto player is again recorded.

In parliamentary systems, if members of the government coalition at t-1 are no longer in government at time t, that number of veto players changes, similarly if the prime minister changes. If an opposition party has a majority at t-1 but that same party does not have a majority at t, then one veto player is said to have dropped. If parliamentary systems go from no government majority or no closed list to government majority and closed list at time t, then the chambers are counted as no longer being veto players.

STABNS

## STABNS_STRICT

Calculated like STABS and STABNS_STRICT, but ignores the presence of a second chamber in the calculation of CHECKS in period t-1.

## Federalism

## AUTON

Are there autonomous regions?

Autonomous regions are not the same as states, provinces, etc. An autonomous region is recorded if a source explicitly mentions a region, area, or district that is autonomous or self-governing. Furthermore, they must be constitutionally designated as “autonomous” or “independent” or “special.” Federal Districts or Capital Districts do not count as autonomous regions. Disputed autonomy is not recorded. Indigenous and First Nations reservations and territories are not counted as autonomous. Deviating from convention, no information recorded as 0.


## MUNI

## Are municipal governments locally elected?

0 if neither local executive nor local legislature are locally elected. 1 if the executive is appointed, but the legislature elected. 2 if they are both locally elected. No information, or no evidence of municipal governments, is recorded as blank. If one source has information on a specific period, and the other has no information on a different period, we do not extrapolate from one source to another; no information is always recorded as blank. If there are multiple levels of sub-national government, we consider the lowest level as the “municipal” level. This variable was extensively updated for this version, and as a result, the number of non-missing observations has increased from 42% to 61%.

## STATE

Are there state/province governments locally elected?

Recorded in the same manner as MUNI. If there are multiple levels of sub-national government, we consider the highest level as the “state/province” level. Indirectly elected state/province governments, where directly elected municipal bodies elect the state/province level, are not considered locally elected. Indirectly elected state/province governments elected by directly elected state/province bodies are considered locally elected. This variable was extensively updated for this version, and as a result, the number of non-missing observations has increased from 66% to 77%.

## AUTHOR Do the state/provinces have authority over taxing, spending, or legislating?

If 1 for any of these, category gets a 1. Authority over “cultural affairs,” or “planning” in Communist systems, does not qualify. This variable was extensively updated for this version, and as a result, the number of non- missing observations has increased from 38% to 42%.

## STCONST Are the constituencies of the senators the states/provinces?

No information recorded as blank. If no senate or no states/provinces, NA. If the senate is only partially elected through the constituencies, we score according to how the majority is elected. If the senate is appointed or elected on a national basis, this gets a 0.


## Appendix: Ambiguous Cases

The office of the president, which is tracked as the chief executive, was officially made a civilian post in 1978. The general holding that office subsequently retired from the military but stayed in office. Therefore, we record MILITARY as 0 starting in 1979.

Benin: LIEC

The assembly is made up of representatives from “socio-professional classes” from 1980 to 1991. These classes cannot be treated as parties, as voters cannot choose among them (rather, they are only concerned with the representative of their own class). There appears to be no competition for seats within these classes. This lack of competition produces a 3 in LIEC.

Bolivia: SYSTEM

Under the 1967 basic law the president was directly elected for a four-year term if the recipient of an absolute majority of votes; otherwise, Congress made the selection from among the three leading candidates. Furthermore, given the selection in 1989 of the third-ranked contender, congressional leaders in mid-1990 agreed on a revision that would limit Congress to choosing between the plurality candidate and the runner- up. As under “normal circumstances” a presidential candidate with an absolute majority of votes would be directly elected by the people (and not the Congress), we treated the system as a presidential system scoring a “0.”

Botswana: SYSTEM

For the entire sample, although nominally a presidential system, the president of Botswana has only limited powers (e.g., no veto over legislation) and is elected by the Assembly for a term coincident with its own. Therefore, we recorded the system as parliamentary.

Cambodia: YRSOFFC, EXECME, LIEC, EIEC

The rival Coalition Government of Democratic Kampuchea, as established in Kuala Lumpur on February 3, 1990, is not reflected in our database.

After the implementation of the new constitution in September 1993, the two rival Chief Executives, Prince Ranariddh and Hun Sen, are both recorded as if one independent was in power. This unusual situation is not treated as “no legislature/executive” for LIEC and EIEC, as the institutions are considered to be functional and are coded normally.

Argentina: MILITARY

## People’s Republic of China: SYSTEM, YRSOFFC, YRCRNT

After the death of Mao Zedong in 1976, there are several offices that could be considered the Chief Executive: the Chairman of the Communist Party (a position abolished in 1982), the General Secretary of the Communist Party, the president, and the premier. For Chief Executive, rather than tracking the occupant of a specific office, we track the official who is indicated by our sources to have the most power. This rule holds even when an official switches offices or holds multiple offices. Following this rule, we track the following officials as the chief executive: 1977-1980: Hua Guofeng (Chairman and Premier); 1981-1989: Zhao Ziyang (Premier until 1987, Secretary-General in 1988-1989); 1990-1995: Jiang Zemin (Secretary-General, also President after 1993). Note that Deng Xiaoping is never tracked as Chief Executive. This is because he never holds any of the four major executive offices mentioned above.


China: Taiwan: LIEC, EIEC

Up until 1992, The Legislative Yuan, considered the formal lawmaking organ, was mostly made up of surviving mainland members, who had had their terms of office extended indefinitely, while Taiwan province members were subject to regular popular election. The Kuomintang seats of the Legislative Yuan reflects the approximate number of ever-decreasing life-time members during this period.

Cape Verde: SYSTEM, YRSOFFIC, EIEC

From independence in 1975 until 1991, both the President and the Prime Minister were elected by the assembly. The person known as the “president” is tracked as the chief executive, because he is mentioned more in the text (see rule “d” for SYSTEM). However, as the “president” is easily dismissed by the assembly, we record the SYSTEM as parliamentary (even though the chief executive being tracked is not the prime minister).

Cyprus: GOV1, GOV2, GOV3, OPP1

President Vassiliou, a non-party businessman running with AKEL endorsement, won the runoff presidential election in 1988. This result (as well as the result of the parliamentary election of 1991) was interpreted as a general endorsement of a non-party Chief Executive. Consequently, all the parties are recorded as being in the government. Therefore we did not use our rule of putting all the parties in the column for the non-aligned or parties with unknown allegiance (ULPRTY), as this would have reduced the available and documented party information.

Eritrea: SYSTEM, FINITTRM, MULTPL?

The powers of the Chief Executive were determined using the 1996 draft constitution, due to the lack of information for the 1993-1995 period.

Guyana: SYSTEM, EIEC, LIEC

From 1991-1995, voters cast their ballots for party slates, with selection of those to enter the assembly decided after the elections by the respective parties, internally. The president, who is the chief executive, is from the party which receives the most votes. We have coded this as a presidential system where the president is chosen by the assembly because he had virtually unlimited powers and because the people do not directly elect him.

## Haiti: SYSTEM, YRSOFFC, FINITTRM, MULTIPL? EXECME, EIEC

Haiti is one of the few cases where the de facto rather than the de jure situation is being recorded. President Aristide, ousted by military coup on September 30, 1991, had the legitimacy of claim to office recognized by the National Assembly on June 15, 1993. However, as he is not physically present in the country (although still performing presidential functions), he is not recorded as executive until his return from exile on October 15, 1994.

## Honduras: SYSTEM

The chief executive is called a prime minister from 1982 to 1989 because he was appointed by the party winning the most assembly seats. This corresponds to the election of a prime minister in a parliamentary system. However, from 1990 on, the sources indicate a presidential vote, thus qualifying the system as presidential.


Indonesia: EIEC, LIEC

For the entire sample, the chief executive is elected in a joint session of the two parliamentary bodies. Our sources indicate that, of its combined 1,000 members, at least 600 are appointed. Consequently, the Chief Executive himself is considered appointed (scoring a 2 on the EIEC).

## Iraq: LIEC

Iraq's system from 1981 to 1991 is analogous to Communist systems, in which one party dominates a National Front. As in Communist nations, this Front is considered one party, and the country is considered a one-party state.

## Laos: LIEC

The legislature is elected by “local authorities” from 1976 onwards. While there is no information on the selection of these authorities, we make the assumption that they are appointed. Thus, since appointed officials elect the legislature, it gets a “2”.

Republic of Korea: LIEC, EIEC

The constitution of 1972 provided for a powerful president designated by a directly elected National Conference for Unification (NCU) and a weak legislature with one-third of its membership appointed by the NCU. Although the NCU itself had one-third of its members appointed, it was made up of more than one party. As this still qualifies as a competitive system (see LIEC), and as there is some indication that at least (formal) competitors for the presidential race were allowed, the Chief Executive is recorded as one who has competitors, although our sources do not indicate whether he received more than 75% of the votes (6.5 on the EIEC) until 1980.

## Mozambique: LIEC

From 1978-1985, the legislature is made up of “Frelimo party officials, ministers, governors, and local representatives.” Since this group is said to be “elected,” we give the LIEC a 3.

Panama: SYSTEM

From 1979-1984, the ease with which the chief executive (formally called the “president”) can be dismissed motivates a “parliamentary” code in SYSTEM.

## Paraguay: LIEC

For our entire sample, the electoral rules of the Paraguayan legislature automatically award 2/3 of the seats to the party receiving over 50% of the vote. Since two or more parties take seats, and the largest party receives less than 75% of the seats, this system is coded as “7” in LIEC.

## Peru: LIEC, EIEC

In 1992, President Fujimori seized extra-constitutional power in a self-coup (autogolpe). Announcing the formation of an Emergency Government of National Reconstruction, the president dissolved Congress and re-constituted it as the Democratic Constituent Congress, for which elections were held. As the president did not unilaterally extend his own term in office—the constitutional change of lifting the ban on presidential reelection being approved by a popular referendum in December 1993—we code the competitiveness of the electoral process of both the executive and legislature as being unaffected.


## Philippines: EIEC

The presidential election of February 1986 was conducted amid allegations by the two opposition leaders, Aquino and Laurel, and foreign observers of government fraud; Aquino was named the victor by an independent citizens’ watchdog group, while official figures attesting to President Marcos’ reelection were accepted by the National Assembly on February 15. With both candidates claiming victory, the turning point came when the army declared their allegiance to Aquino. Ten days later, following the swearing in of both claimants, Marcos departed the country. We consider this transition as a formal constitutional change in power as one of the two rival executives departs the country, thus effectively losing control of his office. Aquino, however, did not win the election but was still sworn in as chief executive. Technically, this could be considered a coup -- the formal loser in the presidential election still took office with the help of the armed forces. However, this view would completely contradict the actual events and the fact that more than 80 percent approved a newly implemented constitution in February 1987, under which President Aquino and Vice President Salvador Laurel would remain in office until 1992. For this second reason, we code the transition as formally competitive.

Suriname: SYSTEM

In 1989-1990 and in 1992-1995, the ease with which the chief executive (formally called the “president”) can be dismissed motivates a “parliamentary” code in SYSTEM.

## Swaziland: SYSTEM, YRSOFFC

For the entire sample, we track the King as the chief executive, due to his ability to suspend the constitution and rule by decree.

## Switzerland: YRSOFFC, PRTYIN, EXECME, EXECRLC, EXECNAT, EXECRURL, EXECREG, EXECREL, EXECAGE

For the entire sample, executive authority is exercised on a collegial basis by a seven-member Federal Council. The assembly each year elects two of the seven to serve one-year terms as president and vice president of the Confederation. The president however has limited prerogatives and serves as a first among equals. Due to the fact that the four major parties (ranging from left-wing to right-wing) have been represented in the Federal Council according to an implicit quota system since 1959, we do not aggregate this information to fit it into our columns. Unlike two-party alliances, where the party information is sometimes added together, the four-party coalition is not coded in terms of orientation, especially since the Council acts more like a nonpolitical body of experts rather than a grouping of party representatives.

## Thailand: SYSTEM, EIEC, LIEC

From 1980 to 1987, General Prem is tracked as the Chief Executive. Since he is elected by the Assembly, he gets the same score as the Assembly. Although some members of the Assembly are appointed, they do not make up the majority two houses. Therefore, Prem gets a “7” in EIEC, matching the LIEC of 7. As he can be dismissed by the joint action of the House and Senate, the system is recorded as “parliamentary,” even though Prem is not associated with any party.

## UAE: EIEC

For the entire sample, the executive is composed of the 7 emirs of the United Arab Emirates, who elect a president from among themselves. Each of these emirs hold significant power in their own emirates, and they are not elected. Therefore the chief executive gets a 2.


## Uganda: SYSTEM, EIEC

From 1981-1985, the leader of the largest party becomes the chief executive. Therefore, the system is called parliamentary in SYSTEM. Since the largest party is determined by voters in free elections, the executive gets a “7” in EIEC.

## Yugoslavia: YRSOFFC

From 1993 on the de jure situation diverges so markedly from the de facto situation that this warrants a special coding. Slobodan Milosevic is the undisputed de facto ruler in Yugoslavia, although he only holds the office of President of Serbia and that of a leading party member of the Socialist Party of Serbia. Therefore, we track Milosevic, although the rest of the coding refers to the Federal State structure and not to that of Serbia.
