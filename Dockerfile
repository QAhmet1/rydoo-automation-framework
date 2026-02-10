# Code explanations are in English [cite: 2026-01-05]
FROM cypress/included:13.6.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# We use sh -c to evaluate the environment variable at runtime
ENTRYPOINT ["sh", "-c", "node setup-allure.js && npx cypress run --env envName=${envName:-qa},allure=true"]