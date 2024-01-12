module.exports = {
  apps: [
    {
      name: "eng-toolkit",
      script: "npm",
      args: "start",
      watch: ["dist"],
    },
  ],
};
