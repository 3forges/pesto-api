class Employee {
    /**
     * ceci est un attribut statiquede de la Classe Employee
     */
    private static NUMBER_OF_EMPLOYEES: number = 0;
    /**
     *
     * @returns la valeur de l'atribut statique [NUMBER_OF_EMPLOYEES] de la Classe Employee
     */
    public static getNUMBER_OF_EMPLOYEES() {
      return Employee.NUMBER_OF_EMPLOYEES;
    }
    /**
     * ------------------------- INSTANCES DEFINITION
     */
    /*
       * --- attributs des instances de la classe 'Employee' : They are already defined
      private firstName: string;
      private lastName: string;
      private jobTitle: string;
      */
    /**
     *
     * @param firstName
     * @param lastName
     * @param jobTitle
     */
    constructor(
      private firstName: string,
      private lastName: string,
      private jobTitle: string
    ) {

      this.firstName = firstName;
      this.lastName = lastName;
      this.jobTitle = jobTitle;
  
      Employee.NUMBER_OF_EMPLOYEES++;
    }
    sePresenter(): void {
      let messageDePresentation = `Bonjour, je m'appelle ${this.firstName} ${this.lastName}, et je suis ${this.jobTitle} `
    }
    setFirstname(newFirstname: string): void {
        this.firstName = newFirstname;
    }
  }
  
  console.log(` # ---------------------- `)
  console.log(` # ---------------------- `)
  console.log(` # ---------------------- `)
  
  console.log(` # ---------------------- `)
  console.log(` # -- Aucun objet de la classe Employee n'existe `)
  console.log(` # ---------------------- `)
  
  console.log(` # ---------------------- `)
  console.log(` # -- Les attributs et méthodes statiques de `)
  console.log(` # -- la classe 'Employee' existent indépendammat de tout objet de la classe 'Employee' `)
  console.log(` # ---------------------- `)
  /**
   * This is not possible because 
   * the 'NUMBER_OF_EMPLOYEES' static attribute
   * of the 'Employee' Class is private :
   * 
   *    console.log(` Nombre total de salariés : ${Employee.NUMBER_OF_EMPLOYEES}`)
   * 
   **/
  // console.log(` Nombre total de salariés : ${Employee.NUMBER_OF_EMPLOYEES}`)
  /**
   * cette technique s'appelle "l'encapsulation" des attributs d'instance d'une classe, ici c'est un "GETTER"
   */
  console.log(` Nombre total de salariés : ${Employee.getNUMBER_OF_EMPLOYEES()}`)
  
  
  
  
  console.log(` # ---------------------- `)
  console.log(` # ---------------------- `)
  console.log(` # ---------------------- `)
  
  console.log(` # ---------------------- `)
  console.log(` # -- Maintenant, oon va créer une instance ( un objet) de la classe 'Employee' `)
  console.log(` # ---------------------- `)
  
  const monpremierEmploye = new Employee('Bernard', 'Minet', 'Ingénieur Réseau')
  
  monpremierEmploye.sePresenter();
  monpremierEmploye.