import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import React, { useState } from "react";
import MathJax from "react-mathjax";
import { SimplifyResponse, SolveResponse } from "../types/EquationResponse";

enum EquationOptions {
  SIMPLIFY = "simplify",
  SOLVEFORX = "solve",
}

const Index = () => {
  const [eq, setEq] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [solveAnswers, setSolveAnswers] = useState<
    SolveResponse["answers"] | null
  >();
  const [simplifyAnswer, setSimplifyAnswer] = useState<
    SimplifyResponse["answer"] | null
  >();
  const [eqOption, setEqOption] = useState<string | null>();

  const handleSubmit = async () => {
    setSolveAnswers(null);
    setSimplifyAnswer(null);
    setLoading(true);
    if (!eqOption) {
      setLoading(false);
      return;
    }
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `http://localhost:4000/${eqOption}`,
      headers: { "Content-Type": "application/json" },
      data: { equation: eq },
    };

    let res;
    switch (eqOption) {
      case EquationOptions.SIMPLIFY:
        res = await axios.request<SimplifyResponse>(options);
        if (res.data.answer) {
          setSimplifyAnswer(res.data.answer);
        }
        break;
      case EquationOptions.SOLVEFORX:
        res = await axios.request<SolveResponse>(options);
        if (res.data.answers) {
          setSolveAnswers(res.data.answers);
        }
        break;
    }
    setLoading(false);
  };

  return (
    <Box maxW="800px" mx="auto" my={8}>
      <Heading mb={4}>Lisolver</Heading>
      <Select
        placeholder="Select Action"
        my={4}
        onChange={(e) => setEqOption(e.target.value)}
      >
        <option value={EquationOptions.SIMPLIFY}>Simplify</option>
        <option value={EquationOptions.SOLVEFORX}>Solve for x</option>
      </Select>
      <Flex>
        <FormControl id="equation">
          <FormLabel>Equation: </FormLabel>
          <Input value={eq} onChange={(e) => setEq(e.target.value)} />
        </FormControl>
        <Button
          colorScheme="teal"
          mt="auto"
          ml={2}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Solve
        </Button>
      </Flex>
      {solveAnswers && (
        <Box my={4}>
          <Heading size="md">Answers: </Heading>
          <MathJax.Provider>
            {solveAnswers.map((e, i) => {
              const _e = i === solveAnswers.length - 1 ? e : e + ", ";
              return (
                <>
                  <MathJax.Node formula={`${_e}`} key={i} />
                </>
              );
            })}
          </MathJax.Provider>
        </Box>
      )}
      {simplifyAnswer && (
        <Box my={4}>
          <Heading size="md">Answer</Heading>
          <MathJax.Provider>
            <MathJax.Node formula={simplifyAnswer} />
          </MathJax.Provider>
        </Box>
      )}
    </Box>
  );
};

export default Index;
