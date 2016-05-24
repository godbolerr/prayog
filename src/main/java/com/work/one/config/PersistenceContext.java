package com.work.one.config;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.work.one.common.AppConstant;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:application.properties")
@EnableJpaRepositories(basePackages = { "com.work.one.repository" })
@EnableTransactionManagement
public class PersistenceContext {

	private static final String[] ENTITY_PACKAGES = {"com.work.one.domain"};

	/**
	 * Creates and configures the HikariCP datasource bean.
	 * 
	 * @param env
	 *            The runtime environment of our application.
	 * @return
	 */
	@Bean(destroyMethod = "close")
	DataSource dataSource(Environment env) {
		HikariConfig dataSourceConfig = new HikariConfig();
		dataSourceConfig.setDriverClassName(env
				.getRequiredProperty(AppConstant.PROPERTY_NAME_DB_DRIVER_CLASS));
		dataSourceConfig.setJdbcUrl(env
				.getRequiredProperty(AppConstant.PROPERTY_NAME_DB_URL));
		dataSourceConfig.setUsername(env
				.getRequiredProperty(AppConstant.PROPERTY_NAME_DB_USER));
		dataSourceConfig.setPassword(env
				.getRequiredProperty(AppConstant.PROPERTY_NAME_DB_PWD));

		return new HikariDataSource(dataSourceConfig);
	}

	/**
	 * Creates the bean that creates the JPA entity manager factory.
	 * 
	 * @param dataSource
	 *            The datasource that provides the database connections.
	 * @param env
	 *            The runtime environment of our application.
	 * @return
	 */
	@Bean
	LocalContainerEntityManagerFactoryBean entityManagerFactory(
			DataSource dataSource, Environment env) {
		LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
		entityManagerFactoryBean.setDataSource(dataSource);
		entityManagerFactoryBean
				.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
		entityManagerFactoryBean.setPackagesToScan(ENTITY_PACKAGES);

		Properties jpaProperties = new Properties();

		// Configures the used database dialect. This allows Hibernate to create
		// SQL
		// that is optimized for the used database.
		jpaProperties.put(AppConstant.PROPERTY_NAME_HIBERNATE_DIALECT,
				env.getRequiredProperty(AppConstant.PROPERTY_NAME_HIBERNATE_DIALECT));

		// Specifies the action that is invoked to the database when the
		// Hibernate
		// SessionFactory is created or closed.
		jpaProperties.put(AppConstant.PROPERTY_NAME_HIBERNATE_HBM2DDL_AUTO,
				env.getRequiredProperty(AppConstant.PROPERTY_NAME_HIBERNATE_HBM2DDL_AUTO));

		// Configures the naming strategy that is used when Hibernate creates
		// new database objects and schema elements
		jpaProperties.put(AppConstant.PROPERTY_NAME_HIBERNATE_NAMING_STRATEGY, env
				.getRequiredProperty(AppConstant.PROPERTY_NAME_HIBERNATE_NAMING_STRATEGY));

		// If the value of this property is true, Hibernate writes all SQL
		// statements to the console.
		jpaProperties.put(AppConstant.PROPERTY_NAME_HIBERNATE_SHOW_SQL,
				env.getRequiredProperty(AppConstant.PROPERTY_NAME_HIBERNATE_SHOW_SQL));

		// If the value of this property is true, Hibernate will use prettyprint
		// when it writes SQL to the console.
		jpaProperties.put(AppConstant.PROPERTY_NAME_HIBERNATE_FORMAT_SQL,
				env.getRequiredProperty(AppConstant.PROPERTY_NAME_HIBERNATE_FORMAT_SQL));

		jpaProperties.put(AppConstant.PROPERTY_NAME_HIBERNATE_USE_SQL_COMMENTS,
				env.getRequiredProperty(AppConstant.PROPERTY_NAME_HIBERNATE_USE_SQL_COMMENTS));
		
		
		entityManagerFactoryBean.setJpaProperties(jpaProperties);

		return entityManagerFactoryBean;
	}

	/**
	 * Creates the jdbc template bean that we use to invoke SQL queries via
	 * JDBC.
	 * 
	 * @param dataSource
	 *            The datasource that provides the database connection.
	 * @return
	 */
	@Bean
	NamedParameterJdbcTemplate jdbcTemplate(DataSource dataSource) {
		return new NamedParameterJdbcTemplate(dataSource);
	}

	/**
	 * Creates the transaction manager bean that integrates the used JPA
	 * provider with the Spring transaction mechanism.
	 * 
	 * @param entityManagerFactory
	 *            The used JPA entity manager factory.
	 * @return
	 */
	@Bean
	JpaTransactionManager transactionManager(
			EntityManagerFactory entityManagerFactory) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory);
		return transactionManager;
	}

}
