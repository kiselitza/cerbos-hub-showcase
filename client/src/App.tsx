import { MantineProvider, createTheme } from "@mantine/core";
import { AppShell } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppHeader } from "./components/AppHeader";
import { ListExpensesContainer } from "./containers/ListExpenses";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewExpensesContainer } from "./containers/ViewExpense";
import { EditExpensesContainer } from "./containers/EditExpense";
import { AdminContainer } from "./containers/AdminContainer";
import { ReportsContainer } from "./containers/ReportsContainer";
import { CreateExpensesContainer } from "./containers/CreateExpense";
import { StatsChecker, StatsProvider } from "./context/StatsContext";
import { StatsPanel } from "./containers/StatsPanel";
import { AppNavBar } from "./components/AppNavBar";
import { HomeContainer } from "./containers/HomeContainer";
import { UIPermissionsProvider } from "./context/UIPermissionsContext";
import { TaxContainer } from "./containers/TaxContainer";
import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
        gcTime: 1000 * 5, // 5 seconds
      },
    },
  });

  return (
    <StatsProvider>
      <QueryClientProvider client={queryClient}>
        <StatsChecker />
        <MantineProvider theme={theme}>
          <Router>
            <AuthProvider>
              <UIPermissionsProvider>
                <AppShell
                  header={{ height: 60 }}
                  navbar={{
                    width: 300,
                    breakpoint: "sm",
                  }}
                  padding="md"
                >
                  <AppShell.Header w="100%">
                    <AppHeader />
                  </AppShell.Header>

                  <AppShell.Navbar p="md">
                    <AppNavBar />
                  </AppShell.Navbar>

                  <AppShell.Main>
                    <Routes>
                      <Route index element={<HomeContainer />} />
                      <Route
                        path="/expenses"
                        element={<ListExpensesContainer />}
                      />
                      <Route
                        path="/expenses/:id"
                        element={<ViewExpensesContainer />}
                      />
                      <Route
                        path="/expenses/:id/edit"
                        element={<EditExpensesContainer />}
                      />
                      <Route
                        path="/expenses/new"
                        element={<CreateExpensesContainer />}
                      />
                      <Route path="/reports" element={<ReportsContainer />} />
                      <Route path="/tax" element={<TaxContainer />} />
                      <Route path="/admin" element={<AdminContainer />} />
                    </Routes>
                    <StatsPanel />
                  </AppShell.Main>
                </AppShell>
              </UIPermissionsProvider>
            </AuthProvider>
          </Router>
        </MantineProvider>
      </QueryClientProvider>
    </StatsProvider>
  );
}

export default App;
