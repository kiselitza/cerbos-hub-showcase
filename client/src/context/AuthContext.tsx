import * as React from "react";

type AuthProviderProps = { children: React.ReactNode };

export type User = {
  id: string;
  roles: string[];
  attributes: {
    department: string;
    region?: "EMEA" | "NA";
  };
};

export const users: { [key: string]: { label: string; user: User } } = {
  sally: {
    label: "Sally (Sales EMEA)",
    user: {
      id: "sally",
      roles: ["USER"],
      attributes: {
        department: "SALES",
        region: "EMEA",
      },
    },
  },
  ian: {
    label: "Ian (IT Admin)",
    user: {
      id: "ian",
      roles: ["ADMIN"],
      attributes: {
        department: "IT",
      },
    },
  },
  frank: {
    label: "Frank (Finance Team)",
    user: {
      id: "frank",
      roles: ["USER"],
      attributes: {
        department: "FINANCE",
        region: "EMEA",
      },
    },
  },
  derek: {
    label: "Derek (Finance Manager)",
    user: {
      id: "derek",
      roles: ["USER", "MANAGER"],
      attributes: {
        department: "FINANCE",
        region: "EMEA",
      },
    },
  },
  simon: {
    label: "Simon (Sales NA Manager)",
    user: {
      id: "simon",
      roles: ["USER", "MANAGER"],
      attributes: {
        department: "SALES",
        region: "NA",
      },
    },
  },
  mark: {
    label: "Mark (Sales EMEA Manager)",
    user: {
      id: "mark",
      roles: ["USER", "MANAGER"],
      attributes: {
        department: "SALES",
        region: "EMEA",
      },
    },
  },
  sydney: {
    label: "Sydney (Sales NA)",
    user: {
      id: "sydney",
      roles: ["USER"],
      attributes: {
        department: "SALES",
        region: "NA",
      },
    },
  },
};

const AuthContext = React.createContext<{
  user: User;
  setUser: (username: string) => void;
}>({
  user: users.sally.user,
  setUser(username) {},
});

function AuthProvider({ children }: AuthProviderProps) {
  let initial = "sally";
  if (window.localStorage.getItem("user")) {
    if (
      window.localStorage.getItem("user") &&
      users[window.localStorage.getItem("user")!]
    ) {
      initial = window.localStorage.getItem("user") || "sally";
    }
  }

  const [user, setUser] = React.useState<User>(users[initial].user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (username) => {
          setUser(users[username].user);
          window.localStorage.setItem("user", username);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
