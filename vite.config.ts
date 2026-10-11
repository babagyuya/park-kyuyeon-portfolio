import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrganizationSite = repositoryName?.endsWith(".github.io");

export default defineConfig({
  plugins: [react()],
  base:
    isGitHubPagesBuild && repositoryName
      ? isUserOrOrganizationSite
        ? "/"
        : `/${repositoryName}/`
      : "/",
});
